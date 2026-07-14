const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Submission = require('../models/Submission');
const Admin = require('../models/Admin');
const sendEmail = require('../utils/email');
const generatePDF = require('../utils/pdfGenerator');
const authMiddleware = require('../middleware/auth');




router.post('/jnf', async (req, res) => {
  try {
    const formData = req.body;
    const companyName = formData.companyName || 'Unknown Company';

    const submission = new Submission({
      formType: 'JNF',
      companyName,
      formData
    });

    await submission.save();

    await sendEmail({
      to: 'tnpoffice@nitkkr.ac.in',
      subject: `New JNF Submission: ${companyName}`,
      text: `A new Job Notification Form (JNF) has been submitted by ${companyName}.

Submission Time: ${submission.submittedAt.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "medium",
        timeZone: "Asia/Kolkata",
      })}`
    }).catch(err => console.log('Email sending failed:', err));

    res.status(201).json({ message: 'JNF submitted successfully', id: submission._id });
  } catch (error) {
    console.error('Error submitting JNF:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.post('/inf', async (req, res) => {
  try {
    const formData = req.body;
    const companyName = formData.companyName || 'Unknown Company';

    const submission = new Submission({
      formType: 'INF',
      companyName,
      formData
    });

    await submission.save(); 
    
    await sendEmail({
      to: 'tnpoffice@nitkkr.ac.in',
      subject: `New INF Submission: ${companyName}`,
      text: `A new Internship Notification Form (INF) has been submitted by ${companyName}.

Submission Time: ${submission.submittedAt.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "medium",
        timeZone: "Asia/Kolkata",
      })}`
    }).catch(err => console.log('Email sending failed:', err));

    res.status(201).json({ message: 'INF submitted successfully', id: submission._id });
  } catch (error) {
    console.error('Error submitting INF:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});




router.get('/public/submissions/:id', async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json(submission);
  } catch (error) {
    console.error('Error fetching public submission:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get('/public/submissions/pdf/:id', async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    generatePDF(submission, res);
  } catch (error) {
    console.error('Error generating public PDF:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});




router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      admin: {
        id: admin.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});




router.get('/admin/submissions', authMiddleware, async (req, res) => {
  try {

    const submissions = await Submission.find({})
      .select('formType companyName submittedAt')
      .sort({ submittedAt: -1 });
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get('/admin/submissions/:id', authMiddleware, async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json(submission);
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.delete('/admin/submissions/:id', authMiddleware, async (req, res) => {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json({ message: 'Submission deleted' });
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.put('/admin/submissions/:id', authMiddleware, async (req, res) => {
  try {
    const { formData } = req.body;


    const companyName = formData.companyName || 'Unknown Company';

    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { formData, companyName },
      { new: true }
    );

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.json(submission);
  } catch (error) {
    console.error('Error updating submission:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get('/admin/submissions/pdf/:id', authMiddleware, async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    generatePDF(submission, res);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
