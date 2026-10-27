import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import {
  db,
  verifyPassword,
  hashPassword,
} from './server_db.ts';
import type {
  AdminUser,
  AdmissionRecord,
  CourseRecord,
  GalleryRecord,
  TeamMemberRecord
} from './server_db.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '500kb' }));

// Express Request augmentation for authenticated admin
interface AuthenticatedRequest extends Request {
  admin?: AdminUser;
  token?: string;
}

// Rate limiting maps
const ipRateMap = new Map<string, { count: number; lastReset: number }>();
const loginAttemptsMap = new Map<string, { count: number; lastAttempt: number; lockedUntil?: number }>();

function checkRateLimit(ip: string, maxPerMin = 30): boolean {
  const now = Date.now();
  const record = ipRateMap.get(ip) || { count: 0, lastReset: now };

  if (now - record.lastReset > 60000) {
    record.count = 0;
    record.lastReset = now;
  }

  record.count += 1;
  ipRateMap.set(ip, record);

  return record.count <= maxPerMin;
}

// Admin Authentication Middleware
function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): any {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Missing or invalid token.' });
  }

  const token = authHeader.split(' ')[1];
  const session = db.getSession(token);

  if (!session) {
    return res.status(401).json({ success: false, error: 'Session expired or invalid. Please log in again.' });
  }

  req.admin = session.admin;
  req.token = token;
  next();
}

// ----------------------------------------------------
// PUBLIC API: ADMISSION & CONTACT FORM SUBMISSIONS
// ----------------------------------------------------

// POST /api/admission
app.post('/api/admission', (req: Request, res: Response): any => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';

  if (!checkRateLimit(ip, 20)) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait a moment before trying again.'
    });
  }

  const {
    fullName,
    fatherName,
    phone,
    whatsapp,
    email,
    dateOfBirth,
    gender,
    qualification,
    selectedCourse,
    preferredBatch,
    hostelRequired,
    address,
    city,
    state,
    pincode,
    _honeypot
  } = req.body;

  if (_honeypot && String(_honeypot).trim() !== '') {
    return res.status(400).json({ success: false, error: 'Spam detected.' });
  }

  const errors: Record<string, string> = {};

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    errors.fullName = 'Full Name is required (minimum 2 characters).';
  }

  if (!fatherName || typeof fatherName !== 'string' || fatherName.trim().length < 2) {
    errors.fatherName = "Father's Name is required (minimum 2 characters).";
  }

  const cleanedPhone = phone ? String(phone).replace(/\D/g, '') : '';
  if (cleanedPhone.length !== 10) {
    errors.phone = 'Valid 10-digit Indian mobile number is required.';
  }

  if (!dateOfBirth || typeof dateOfBirth !== 'string') {
    errors.dateOfBirth = 'Date of birth is required.';
  }

  if (!selectedCourse) {
    errors.selectedCourse = 'Please select a course program.';
  }

  if (!address || typeof address !== 'string' || address.trim().length < 5) {
    errors.address = 'Permanent postal address is required (minimum 5 characters).';
  }

  const cleanedPincode = pincode ? String(pincode).replace(/\D/g, '') : '';
  if (cleanedPincode.length !== 6) {
    errors.pincode = 'Valid 6-digit postal PIN code is required.';
  }

  if (email && typeof email === 'string' && email.trim() !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors
    });
  }

  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const applicationId = `MOBNET-ADM-${new Date().getFullYear()}-${randomSuffix}`;

  const record = db.addAdmission({
    id: applicationId,
    fullName: fullName.trim(),
    fatherName: fatherName.trim(),
    phone: cleanedPhone,
    whatsapp: whatsapp ? String(whatsapp).replace(/\D/g, '') : cleanedPhone,
    email: email ? String(email).trim() : undefined,
    dateOfBirth: String(dateOfBirth).trim(),
    gender: gender ? String(gender).trim() : 'Male',
    qualification: qualification ? String(qualification).trim() : '12th Pass',
    selectedCourse: String(selectedCourse),
    preferredBatch: preferredBatch ? String(preferredBatch).trim() : 'Morning',
    hostelRequired: Boolean(hostelRequired),
    address: address.trim(),
    city: city ? String(city).trim() : 'Dhanbad',
    state: state ? String(state).trim() : 'Jharkhand',
    pincode: cleanedPincode,
    appliedAt: new Date().toISOString(),
    ip
  });

  return res.status(201).json({
    success: true,
    applicationId,
    message: 'Application registered in MOBNET International campus database.',
    data: record
  });
});

// POST /api/contact
app.post('/api/contact', (req: Request, res: Response): any => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';

  if (!checkRateLimit(ip, 20)) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait a moment before trying again.'
    });
  }

  const { name, phone, email, message, consent, _honeypot } = req.body;

  if (_honeypot && String(_honeypot).trim() !== '') {
    return res.status(400).json({ success: false, error: 'Spam detected.' });
  }

  const errors: Record<string, string> = {};

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.name = 'Full name is required (minimum 2 characters).';
  }

  const cleanedPhone = phone ? String(phone).replace(/\D/g, '') : '';
  if (cleanedPhone.length !== 10) {
    errors.phone = 'Valid 10-digit mobile number is required.';
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
  }

  if (!consent) {
    errors.consent = 'Consent to be contacted is required.';
  }

  if (email && typeof email === 'string' && email.trim() !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors
    });
  }

  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const inquiryId = `MOBNET-INQ-${new Date().getFullYear()}-${randomSuffix}`;

  const record = db.addInquiry({
    id: inquiryId,
    name: name.trim(),
    phone: cleanedPhone,
    email: email ? String(email).trim() : undefined,
    message: message.trim(),
    receivedAt: new Date().toISOString(),
    ip
  });

  return res.status(201).json({
    success: true,
    inquiryId,
    message: 'Message delivered to MOBNET International admissions coordinator desk.',
    data: record
  });
});

// ----------------------------------------------------
// PUBLIC GET ENDPOINTS (Read-only dynamic sync)
// ----------------------------------------------------
app.get('/api/public/content', (_req: Request, res: Response) => {
  res.json({ success: true, data: db.getData().content });
});

app.get('/api/public/settings', (_req: Request, res: Response) => {
  res.json({ success: true, data: db.getData().settings });
});

app.get('/api/public/courses', (_req: Request, res: Response) => {
  const published = db.getData().courses.filter((c) => c.isPublished);
  res.json({ success: true, data: published });
});

app.get('/api/public/gallery', (_req: Request, res: Response) => {
  const published = db.getData().gallery.filter((g) => g.isPublished);
  res.json({ success: true, data: published });
});

app.get('/api/public/team', (_req: Request, res: Response) => {
  res.json({ success: true, data: db.getData().team });
});

// ----------------------------------------------------
// ADMIN AUTHENTICATION ENDPOINTS
// ----------------------------------------------------

// POST /api/admin/login
app.post('/api/admin/login', (req: Request, res: Response): any => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const { email, password, rememberMe } = req.body;

  // Brute force protection: check lockout
  const attemptKey = `${ip}:${email || ''}`;
  const now = Date.now();
  const attempt = loginAttemptsMap.get(attemptKey) || { count: 0, lastAttempt: now };

  if (attempt.lockedUntil && attempt.lockedUntil > now) {
    const remainingSec = Math.ceil((attempt.lockedUntil - now) / 1000);
    return res.status(429).json({
      success: false,
      error: `Too many failed login attempts. Account temporarily locked for security. Please try again in ${remainingSec} seconds.`
    });
  }

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password are required.' });
  }

  const admin = db.findAdminByEmail(email);
  if (!admin) {
    attempt.count += 1;
    attempt.lastAttempt = now;
    if (attempt.count >= 5) {
      attempt.lockedUntil = now + 15 * 60 * 1000; // 15 min lock
    }
    loginAttemptsMap.set(attemptKey, attempt);

    return res.status(401).json({
      success: false,
      error: 'Invalid credentials. Please verify your administrator email and password.'
    });
  }

  const isValid = verifyPassword(password, admin.salt, admin.passwordHash);
  if (!isValid) {
    attempt.count += 1;
    attempt.lastAttempt = now;
    if (attempt.count >= 5) {
      attempt.lockedUntil = now + 15 * 60 * 1000;
      loginAttemptsMap.set(attemptKey, attempt);
      return res.status(429).json({
        success: false,
        error: 'Too many failed login attempts. Locked for 15 minutes.'
      });
    }
    loginAttemptsMap.set(attemptKey, attempt);

    return res.status(401).json({
      success: false,
      error: 'Invalid credentials. Please verify your administrator email and password.'
    });
  }

  // Reset login attempt counter on success
  loginAttemptsMap.delete(attemptKey);
  admin.lastLoginAt = new Date().toISOString();
  db.save();

  const token = db.createSession(admin.id, ip, Boolean(rememberMe));

  return res.json({
    success: true,
    token,
    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      lastLoginAt: admin.lastLoginAt
    }
  });
});

// POST /api/admin/logout
app.post('/api/admin/logout', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  if (req.token) {
    db.deleteSession(req.token);
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

// GET /api/admin/me
app.get('/api/admin/me', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const admin = req.admin!;
  res.json({
    success: true,
    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      lastLoginAt: admin.lastLoginAt
    }
  });
});

// POST /api/admin/change-password
app.post('/api/admin/change-password', requireAdmin, (req: AuthenticatedRequest, res: Response): any => {
  const { currentPassword, newPassword } = req.body;
  const admin = req.admin!;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, error: 'Current and new password are required.' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ success: false, error: 'New password must be at least 8 characters long.' });
  }

  const isValid = verifyPassword(currentPassword, admin.salt, admin.passwordHash);
  if (!isValid) {
    return res.status(400).json({ success: false, error: 'Current password is incorrect.' });
  }

  const updatedHash = hashPassword(newPassword);
  admin.salt = updatedHash.salt;
  admin.passwordHash = updatedHash.hash;
  db.save();

  return res.json({ success: true, message: 'Password updated successfully.' });
});

// ----------------------------------------------------
// ADMIN DASHBOARD OVERVIEW
// ----------------------------------------------------
app.get('/api/admin/overview', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  const data = db.getData();

  const totalAdmissions = data.admissions.length;
  const newAdmissions = data.admissions.filter((a) => a.status === 'New').length;
  const totalCourses = data.courses.length;
  const activeCourses = data.courses.filter((c) => c.isPublished).length;
  const totalGallery = data.gallery.length;
  const publishedGallery = data.gallery.filter((g) => g.isPublished).length;
  const unreadMessages = data.inquiries.filter((i) => !i.isRead).length;
  const totalMessages = data.inquiries.length;

  const recentAdmissions = data.admissions.slice(0, 8);
  const recentMessages = data.inquiries.slice(0, 5);

  res.json({
    success: true,
    stats: {
      totalAdmissions,
      newAdmissions,
      totalCourses,
      activeCourses,
      totalGallery,
      publishedGallery,
      unreadMessages,
      totalMessages
    },
    recentAdmissions,
    recentMessages
  });
});

// ----------------------------------------------------
// ADMIN ADMISSIONS MANAGEMENT
// ----------------------------------------------------

// GET /api/admin/admissions
app.get('/api/admin/admissions', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { search, status, course } = req.query;
  let items = [...db.getData().admissions];

  if (status && typeof status === 'string' && status !== 'all') {
    items = items.filter((a) => a.status.toLowerCase() === status.toLowerCase());
  }

  if (course && typeof course === 'string' && course !== 'all') {
    items = items.filter((a) => a.selectedCourse.toLowerCase() === course.toLowerCase());
  }

  if (search && typeof search === 'string' && search.trim() !== '') {
    const q = search.toLowerCase().trim();
    items = items.filter(
      (a) =>
        a.id.toLowerCase().includes(q) ||
        a.fullName.toLowerCase().includes(q) ||
        a.phone.includes(q) ||
        (a.email && a.email.toLowerCase().includes(q)) ||
        a.city.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    total: items.length,
    admissions: items
  });
});

// PUT /api/admin/admissions/:id/status
app.put('/api/admin/admissions/:id/status', requireAdmin, (req: AuthenticatedRequest, res: Response): any => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses: AdmissionRecord['status'][] = ['New', 'Contacted', 'In Progress', 'Admitted', 'Closed'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, error: 'Invalid status.' });
  }

  const updated = db.updateAdmissionStatus(id, status);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Admission not found.' });
  }

  res.json({ success: true, admission: updated });
});

// POST /api/admin/admissions/:id/notes
app.post('/api/admin/admissions/:id/notes', requireAdmin, (req: AuthenticatedRequest, res: Response): any => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text || typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({ success: false, error: 'Note text is required.' });
  }

  const authorName = req.admin?.name || 'Admin';
  const updated = db.addAdmissionNote(id, authorName, text);

  if (!updated) {
    return res.status(404).json({ success: false, error: 'Admission not found.' });
  }

  res.json({ success: true, admission: updated });
});

// DELETE /api/admin/admissions/:id
app.delete('/api/admin/admissions/:id', requireAdmin, (req: AuthenticatedRequest, res: Response): any => {
  const { id } = req.params;
  const success = db.deleteAdmission(id);
  if (!success) {
    return res.status(404).json({ success: false, error: 'Admission not found.' });
  }
  res.json({ success: true, message: 'Admission deleted.' });
});

// GET /api/admin/export/admissions.csv
app.get('/api/admin/export/admissions.csv', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  const items = db.getData().admissions;

  const headers = [
    'Application ID',
    'Applied At',
    'Full Name',
    "Father's Name",
    'Phone',
    'WhatsApp',
    'Email',
    'Date of Birth',
    'Gender',
    'Qualification',
    'Selected Course',
    'Preferred Batch',
    'Hostel Required',
    'Address',
    'City',
    'State',
    'PIN Code',
    'Status',
    'Notes Count'
  ];

  const escapeCSV = (str: any) => {
    if (str === null || str === undefined) return '""';
    const s = String(str).replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = items.map((a) => [
    escapeCSV(a.id),
    escapeCSV(a.appliedAt),
    escapeCSV(a.fullName),
    escapeCSV(a.fatherName),
    escapeCSV(a.phone),
    escapeCSV(a.whatsapp),
    escapeCSV(a.email || ''),
    escapeCSV(a.dateOfBirth),
    escapeCSV(a.gender),
    escapeCSV(a.qualification),
    escapeCSV(a.selectedCourse),
    escapeCSV(a.preferredBatch),
    escapeCSV(a.hostelRequired ? 'Yes' : 'No'),
    escapeCSV(a.address),
    escapeCSV(a.city),
    escapeCSV(a.state),
    escapeCSV(a.pincode),
    escapeCSV(a.status),
    escapeCSV(a.notes ? a.notes.length : 0)
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="mobnet-admissions-${new Date().toISOString().slice(0, 10)}.csv"`);
  res.send(csvContent);
});

// ----------------------------------------------------
// ADMIN COURSES MANAGEMENT
// ----------------------------------------------------
app.get('/api/admin/courses', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  res.json({ success: true, courses: db.getData().courses });
});

app.post('/api/admin/courses', requireAdmin, (req: AuthenticatedRequest, res: Response): any => {
  const courseData = req.body;
  if (!courseData.title || !courseData.slug) {
    return res.status(400).json({ success: false, error: 'Course title and slug are required.' });
  }

  const courses = db.getData().courses;
  const newCourse: CourseRecord = {
    id: courseData.slug.toLowerCase().trim(),
    slug: courseData.slug.toLowerCase().trim(),
    title: courseData.title,
    category: courseData.category || 'hardware',
    duration: courseData.duration || 'Flexible',
    hasConfirmedDuration: Boolean(courseData.hasConfirmedDuration),
    practicalRatio: courseData.practicalRatio || '80% Practical',
    level: courseData.level || 'All Levels',
    shortDescription: courseData.shortDescription || '',
    fullOverview: courseData.fullOverview || '',
    highlights: Array.isArray(courseData.highlights) ? courseData.highlights : [],
    modules: Array.isArray(courseData.modules) ? courseData.modules : [],
    toolsCovered: Array.isArray(courseData.toolsCovered) ? courseData.toolsCovered : [],
    skillsLearned: Array.isArray(courseData.skillsLearned) ? courseData.skillsLearned : [],
    practicalApproach: courseData.practicalApproach || '',
    careerOpportunities: Array.isArray(courseData.careerOpportunities) ? courseData.careerOpportunities : [],
    faqs: Array.isArray(courseData.faqs) ? courseData.faqs : [],
    visualType: courseData.visualType || 'tools',
    isPublished: courseData.isPublished !== undefined ? Boolean(courseData.isPublished) : true,
    order: courses.length + 1
  };

  courses.push(newCourse);
  db.save();

  res.status(201).json({ success: true, course: newCourse });
});

app.put('/api/admin/courses/:id', requireAdmin, (req: AuthenticatedRequest, res: Response): any => {
  const { id } = req.params;
  const courseData = req.body;
  const courses = db.getData().courses;
  const index = courses.findIndex((c) => c.id === id || c.slug === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Course not found.' });
  }

  courses[index] = {
    ...courses[index],
    ...courseData,
    id: courses[index].id // preserve id
  };
  db.save();

  res.json({ success: true, course: courses[index] });
});

app.delete('/api/admin/courses/:id', requireAdmin, (req: AuthenticatedRequest, res: Response): any => {
  const { id } = req.params;
  const prevLen = db.getData().courses.length;
  db.getData().courses = db.getData().courses.filter((c) => c.id !== id && c.slug !== id);
  if (db.getData().courses.length !== prevLen) {
    db.save();
    return res.json({ success: true, message: 'Course deleted.' });
  }
  return res.status(404).json({ success: false, error: 'Course not found.' });
});

// ----------------------------------------------------
// ADMIN GALLERY MANAGEMENT
// ----------------------------------------------------
app.get('/api/admin/gallery', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  res.json({ success: true, gallery: db.getData().gallery });
});

app.post('/api/admin/gallery', requireAdmin, (req: AuthenticatedRequest, res: Response): any => {
  const item = req.body;
  if (!item.title || !item.category) {
    return res.status(400).json({ success: false, error: 'Title and category are required.' });
  }

  const gallery = db.getData().gallery;
  const newId = `gallery-${Date.now()}`;
  const newItem: GalleryRecord = {
    id: newId,
    topicNumber: item.topicNumber || gallery.length + 1,
    title: item.title,
    category: item.category,
    description: item.description || '',
    badge: item.badge || 'Lab Facility',
    altText: item.altText || item.title,
    visualType: item.visualType || 'tools',
    imageUrl: item.imageUrl || undefined,
    isPublished: item.isPublished !== undefined ? Boolean(item.isPublished) : true,
    order: gallery.length + 1
  };

  gallery.push(newItem);
  db.save();

  res.status(201).json({ success: true, item: newItem });
});

app.put('/api/admin/gallery/:id', requireAdmin, (req: AuthenticatedRequest, res: Response): any => {
  const { id } = req.params;
  const gallery = db.getData().gallery;
  const index = gallery.findIndex((g) => g.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Gallery item not found.' });
  }

  gallery[index] = {
    ...gallery[index],
    ...req.body,
    id: gallery[index].id
  };
  db.save();

  res.json({ success: true, item: gallery[index] });
});

app.delete('/api/admin/gallery/:id', requireAdmin, (req: AuthenticatedRequest, res: Response): any => {
  const { id } = req.params;
  const prevLen = db.getData().gallery.length;
  db.getData().gallery = db.getData().gallery.filter((g) => g.id !== id);
  if (db.getData().gallery.length !== prevLen) {
    db.save();
    return res.json({ success: true, message: 'Gallery item removed.' });
  }
  return res.status(404).json({ success: false, error: 'Gallery item not found.' });
});

// ----------------------------------------------------
// ADMIN MESSAGES / INQUIRIES MANAGEMENT
// ----------------------------------------------------
app.get('/api/admin/messages', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { unreadOnly, search } = req.query;
  let items = [...db.getData().inquiries];

  if (unreadOnly === 'true') {
    items = items.filter((i) => !i.isRead);
  }

  if (search && typeof search === 'string' && search.trim() !== '') {
    const q = search.toLowerCase().trim();
    items = items.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.phone.includes(q) ||
        (i.email && i.email.toLowerCase().includes(q)) ||
        i.message.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, total: items.length, messages: items });
});

app.put('/api/admin/messages/:id/read', requireAdmin, (req: AuthenticatedRequest, res: Response): any => {
  const { id } = req.params;
  const { isRead } = req.body;
  const updated = db.markInquiryRead(id, Boolean(isRead));
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Message not found.' });
  }
  res.json({ success: true, messageItem: updated });
});

app.post('/api/admin/messages/:id/notes', requireAdmin, (req: AuthenticatedRequest, res: Response): any => {
  const { id } = req.params;
  const { text } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ success: false, error: 'Note text required.' });
  }
  const author = req.admin?.name || 'Admin';
  const updated = db.addInquiryNote(id, author, text);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Message not found.' });
  }
  res.json({ success: true, messageItem: updated });
});

app.delete('/api/admin/messages/:id', requireAdmin, (req: AuthenticatedRequest, res: Response): any => {
  const { id } = req.params;
  const success = db.deleteInquiry(id);
  if (!success) {
    return res.status(404).json({ success: false, error: 'Message not found.' });
  }
  res.json({ success: true, message: 'Message deleted.' });
});

// ----------------------------------------------------
// ADMIN SITE CONTENT MANAGEMENT
// ----------------------------------------------------
app.get('/api/admin/content', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  res.json({ success: true, content: db.getData().content });
});

app.put('/api/admin/content', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  db.getData().content = {
    ...db.getData().content,
    ...req.body
  };
  db.save();
  res.json({ success: true, content: db.getData().content, message: 'Content updated successfully.' });
});

// ----------------------------------------------------
// ADMIN TEAM MANAGEMENT
// ----------------------------------------------------
app.get('/api/admin/team', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  res.json({ success: true, team: db.getData().team });
});

app.post('/api/admin/team', requireAdmin, (req: AuthenticatedRequest, res: Response): any => {
  const { name, role, experience, accentColor } = req.body;
  if (!name || !role) {
    return res.status(400).json({ success: false, error: 'Name and role are required.' });
  }
  const team = db.getData().team;
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((part: string) => part[0].toUpperCase())
    .slice(0, 2)
    .join('');

  const newMember: TeamMemberRecord = {
    id: `team-${Date.now()}`,
    name: name.trim(),
    role: role.trim(),
    initials: initials || 'MB',
    experience: experience || '',
    accentColor: accentColor || 'bg-[#292F91]',
    order: team.length + 1
  };

  team.push(newMember);
  db.save();
  res.status(201).json({ success: true, member: newMember });
});

app.put('/api/admin/team/:id', requireAdmin, (req: AuthenticatedRequest, res: Response): any => {
  const { id } = req.params;
  const team = db.getData().team;
  const index = team.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Team member not found.' });
  }
  team[index] = {
    ...team[index],
    ...req.body,
    id: team[index].id
  };
  db.save();
  res.json({ success: true, member: team[index] });
});

app.delete('/api/admin/team/:id', requireAdmin, (req: AuthenticatedRequest, res: Response): any => {
  const { id } = req.params;
  const prevLen = db.getData().team.length;
  db.getData().team = db.getData().team.filter((t) => t.id !== id);
  if (db.getData().team.length !== prevLen) {
    db.save();
    return res.json({ success: true, message: 'Team member removed.' });
  }
  return res.status(404).json({ success: false, error: 'Team member not found.' });
});

// ----------------------------------------------------
// ADMIN SETTINGS MANAGEMENT
// ----------------------------------------------------
app.get('/api/admin/settings', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  res.json({ success: true, settings: db.getData().settings });
});

app.put('/api/admin/settings', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  db.getData().settings = {
    ...db.getData().settings,
    ...req.body
  };
  db.save();
  res.json({ success: true, settings: db.getData().settings, message: 'Settings saved.' });
});

// ----------------------------------------------------
// SPA SERVER INTEGRATION
// ----------------------------------------------------
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`MOBNET Server running on http://localhost:${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer();
