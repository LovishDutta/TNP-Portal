const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  formType: {
    type: String,
    required: true,
    enum: ['JNF', 'INF']
  },
  companyName: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  formData: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
});

module.exports = mongoose.model('Submission', submissionSchema);
