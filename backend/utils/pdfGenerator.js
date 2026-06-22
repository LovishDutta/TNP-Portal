const PDFDocument = require('pdfkit');

/**
 * Generates a premium PDF document from submission data.
 * @param {Object} submission - The submission document from MongoDB
 * @param {Object} res - Express response object to pipe the PDF stream into
 */
const generatePDF = (submission, res) => {
  // Use bufferPages so we can add footers/page numbers at the very end
  const doc = new PDFDocument({ 
    margin: 50, 
    size: 'A4',
    bufferPages: true 
  });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=${submission.formType}_${(submission.companyName || 'Unknown').replace(/\\s+/g, '_')}_${new Date(submission.submittedAt).getTime()}.pdf`
  );

  doc.pipe(res);

  // --- Theme ---
  const colors = {
    maroon: '#7A0019',
    maroonLight: '#9A1B35',
    textDark: '#111827',
    textMedium: '#374151',
    textLight: '#6B7280',
    bgLight: '#F9FAFB',
    bgGray: '#F3F4F6',
    border: '#E5E7EB',
    white: '#FFFFFF',
    greenBg: '#DEF7EC',
    greenText: '#03543F',
    redBg: '#FDF2F2',
    redText: '#9B1C1C'
  };

  const fonts = {
    bold: 'Helvetica-Bold',
    regular: 'Helvetica',
    italic: 'Helvetica-Oblique'
  };

  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const margins = doc.page.margins;
  const contentWidth = pageWidth - margins.left - margins.right;

  // --- Helpers ---
  const formatKey = (key) => {
    return key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase());
  };

  const isEmpty = (val) => {
    if (val === undefined || val === null) return true;
    if (typeof val === 'string') {
      const trimmed = val.trim();
      if (trimmed === '' || trimmed.toLowerCase() === 'n/a' || trimmed === '-') return true;
    }
    if (Array.isArray(val)) {
      if (val.length === 0 || val.every(item => isEmpty(item))) return true;
    }
    if (typeof val === 'object' && !Array.isArray(val)) {
      if (Object.keys(val).length === 0) return true;
      if (Object.values(val).every(item => isEmpty(item))) return true;
    }
    return false;
  };

  const checkPageBreak = (neededHeight) => {
    if (doc.y + neededHeight > pageHeight - margins.bottom - 40) { // 40 for footer
      doc.addPage();
      return true;
    }
    return false;
  };

  // --- Components ---
  const drawHeader = () => {
    // Maroon Banner
    doc.rect(0, 0, pageWidth, 110).fill(colors.maroon);
    
    // Logo text
    doc.fillColor(colors.white).fontSize(28).font(fonts.bold).text('NIT KURUKSHETRA', 0, 35, { align: 'center', characterSpacing: 1 });
    
    // Subtitle / Form Type
    const formTitle = submission.formType === 'JNF' ? 'JOB NOTIFICATION FORM' : 'INTERNSHIP NOTIFICATION FORM';
    doc.fillColor('#FCA5A5').fontSize(12).font(fonts.bold).text(formTitle, 0, 70, { align: 'center', characterSpacing: 2 });
    
    doc.y = 140; // Reset Y after banner
  };

  const drawSectionHeader = (title) => {
    checkPageBreak(50);
    doc.moveDown(1.5);
    
    // Draw background strip
    doc.rect(margins.left, doc.y, contentWidth, 28).fill(colors.bgGray);
    
    // Draw Accent Line
    doc.rect(margins.left, doc.y, 4, 28).fill(colors.maroon);
    
    doc.fillColor(colors.maroon).fontSize(13).font(fonts.bold).text(title.toUpperCase(), margins.left + 15, doc.y + 8, { characterSpacing: 1 });
    doc.moveDown(1.5);
  };

  const drawBadge = (text, x, y) => {
    const isYes = text.toString().toLowerCase() === 'yes';
    const bgColor = isYes ? colors.greenBg : colors.redBg;
    const textColor = isYes ? colors.greenText : colors.redText;
    const width = 40;
    const height = 18;
    
    doc.rect(x, y - 2, width, height).fill(bgColor);
    doc.fillColor(textColor).fontSize(9).font(fonts.bold).text(text.toUpperCase(), x, y + 2, { width: width, align: 'center' });
  };

  const drawZebraRow = (key, value, index) => {
    if (isEmpty(value)) return;
    
    // Estimate height needed. A standard row needs about 24px. Multi-line values need more.
    const textHeight = doc.heightOfString(String(value), { width: contentWidth - 160 });
    const rowHeight = Math.max(28, textHeight + 12);
    
    checkPageBreak(rowHeight);

    // Zebra background
    if (index % 2 === 0) {
      doc.rect(margins.left, doc.y, contentWidth, rowHeight).fill(colors.bgLight);
    }
    
    const currentY = doc.y + 8;
    
    // Key
    doc.fillColor(colors.textMedium).fontSize(10).font(fonts.bold).text(formatKey(key), margins.left + 10, currentY, { width: 140 });
    
    // Value or Badge
    const valStr = String(value);
    if (valStr.toLowerCase() === 'yes' || valStr.toLowerCase() === 'no') {
      drawBadge(valStr, margins.left + 160, currentY);
    } else {
      doc.fillColor(colors.textDark).fontSize(10).font(fonts.regular).text(valStr, margins.left + 160, currentY, { width: contentWidth - 170 });
    }
    
    doc.y = currentY + Math.max(16, textHeight) + 4;
  };

  // --- Document Assembly ---

  // 1. Initial Page Header
  drawHeader();

  // Document Info Block
  doc.fillColor(colors.textDark).fontSize(18).font(fonts.bold).text(submission.companyName || 'Unknown Company');
  doc.fillColor(colors.textLight).fontSize(10).font(fonts.regular).text(`Submission ID: ${submission._id}`);
  doc.fillColor(colors.textLight).text(`Date Submitted: ${new Date(submission.submittedAt).toLocaleString()}`);

  const data = submission.formData;

  // Render Grouped Primitives
  const groups = {
    'Company Details': ['companyName', 'emailAddress', 'website', 'companyType', 'companyTypeOther', 'domain', 'domainOther', 'organisationDescription'],
    'Eligibility Criteria': ['minimumCGPA', 'medicalCondition', 'otherCriteria'],
    'Selection Process': ['resumeShortlisting', 'prePlacementTalk', 'groupDiscussion', 'aptitudeTest', 'testMode', 'technicalTest', 'technicalInterview', 'hrInterview', 'otherRounds', 'expectedRecruits', 'tentativeVisitDate', 'accommodationRequired', 'bondDetails'],
    'Additional Information': ['sponsorEvents', 'internshipsOffered', 'internshipStreams', 'internshipDuration', 'studentContests', 'contestDetails']
  };

  const renderedKeys = new Set();

  for (const [groupName, keys] of Object.entries(groups)) {
    const validKeys = keys.filter(k => !isEmpty(data[k]));
    
    if (validKeys.length > 0) {
      drawSectionHeader(groupName);
      validKeys.forEach((k, idx) => {
        drawZebraRow(k, data[k], idx);
        renderedKeys.add(k);
      });
    }
  }

  // Render Arrays (Courses & Branches)
  const branchKeys = ['ugBranches', 'minorDegrees', 'pgSpecializations'];
  const validBranchKeys = branchKeys.filter(k => !isEmpty(data[k]));

  if (validBranchKeys.length > 0) {
    drawSectionHeader('Eligible Courses & Branches');
    validBranchKeys.forEach((k, idx) => {
      // Create a nice comma separated string
      const valStr = data[k].join(', ');
      drawZebraRow(k, valStr, idx);
      renderedKeys.add(k);
    });
  }

  // Render Complex Objects (Contacts)
  if (!isEmpty(data.contacts)) {
    drawSectionHeader('Company Officials');
    data.contacts.forEach((contact, idx) => {
      if (!isEmpty(contact.name) || !isEmpty(contact.email)) {
        checkPageBreak(80);
        
        doc.moveDown(0.5);
        // Contact Card Border
        const startY = doc.y;
        
        doc.fillColor(colors.maroon).fontSize(11).font(fonts.bold).text(`Contact ${idx + 1}`, margins.left + 15, startY + 12);
        
        let currentY = doc.y + 8;
        const keys = Object.keys(contact).filter(k => !isEmpty(contact[k]));
        
        keys.forEach((k, i) => {
          doc.fillColor(colors.textMedium).fontSize(10).font(fonts.bold).text(formatKey(k), margins.left + 15, currentY, { width: 100 });
          doc.fillColor(colors.textDark).fontSize(10).font(fonts.regular).text(String(contact[k]), margins.left + 120, currentY);
          currentY += 20;
        });
        
        // Draw border around contact
        const cardHeight = currentY - startY + 10;
        doc.rect(margins.left, startY, contentWidth, cardHeight).lineWidth(1).stroke(colors.border);
        
        doc.y = currentY + 15;
      }
    });
    renderedKeys.add('contacts');
  }

  // Render Job Profiles / Internship Profiles
  const profileKeys = ['jobProfiles', 'internshipProfiles'];
  profileKeys.forEach(pk => {
    if (!isEmpty(data[pk])) {
      
      const validProfiles = Object.entries(data[pk]).filter(([course, details]) => !isEmpty(details.designation));
      
      if (validProfiles.length > 0) {
        drawSectionHeader(pk === 'jobProfiles' ? 'Job Profiles' : 'Internship Profiles');
        
        validProfiles.forEach(([course, details]) => {
          checkPageBreak(150);
          
          const startY = doc.y;
          
          // Profile Card Header Fill
          doc.rect(margins.left, startY, contentWidth, 30).fill(colors.maroonLight);
          doc.fillColor(colors.white).fontSize(11).font(fonts.bold).text(`Profile: ${course.toUpperCase()}`, margins.left + 15, startY + 10);
          
          let currentY = startY + 40;
          
          const detailKeys = Object.keys(details).filter(k => !isEmpty(details[k]));
          
          detailKeys.forEach((k, i) => {
            const textHeight = doc.heightOfString(String(details[k]), { width: contentWidth - 170 });
            
            if (i % 2 === 0) {
              doc.rect(margins.left, currentY - 5, contentWidth, Math.max(24, textHeight + 10)).fill(colors.bgLight);
            }
            
            doc.fillColor(colors.textMedium).fontSize(10).font(fonts.bold).text(formatKey(k), margins.left + 15, currentY, { width: 140 });
            doc.fillColor(colors.textDark).fontSize(10).font(fonts.regular).text(String(details[k]), margins.left + 160, currentY, { width: contentWidth - 170 });
            
            currentY += Math.max(24, textHeight + 10);
          });
          
          // Outer Border
          const cardHeight = currentY - startY + 5;
          doc.rect(margins.left, startY, contentWidth, cardHeight).lineWidth(1).stroke(colors.border);
          
          doc.y = currentY + 20;
        });
        renderedKeys.add(pk);
      }
    }
  });

  // Render any remaining miscellaneous data
  const leftovers = Object.keys(data).filter(k => !renderedKeys.has(k) && !isEmpty(data[k]) && k !== 'companyDetails' && k !== 'jobProfile' && k !== 'internshipProfile');
  if (leftovers.length > 0) {
    drawSectionHeader('Other Details');
    leftovers.forEach((k, idx) => {
      if (typeof data[k] !== 'object') {
        drawZebraRow(k, data[k], idx);
      } else {
        // If there's an unknown object, dump it
        checkPageBreak(60);
        doc.fillColor(colors.textMedium).fontSize(10).font(fonts.bold).text(formatKey(k), margins.left, doc.y);
        doc.moveDown(0.5);
        doc.fillColor(colors.textDark).fontSize(9).font('Courier').text(JSON.stringify(data[k], null, 2), margins.left + 15, doc.y);
        doc.moveDown(1);
      }
    });
  }

  // --- Add Footers to all pages ---
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    
    // Temporarily disable bottom margin to prevent auto page breaks when drawing footer
    const originalBottomMargin = doc.page.margins.bottom;
    doc.page.margins.bottom = 0;
    
    // Top border of footer
    doc.moveTo(margins.left, pageHeight - 40)
       .lineTo(pageWidth - margins.right, pageHeight - 40)
       .lineWidth(1)
       .stroke(colors.border);
       
    // Footer text
    doc.fillColor(colors.textLight).fontSize(9).font(fonts.regular)
       .text('Generated by NIT Kurukshetra TNP Portal', margins.left, pageHeight - 30, { lineBreak: false });
       
    doc.fillColor(colors.textLight).fontSize(9).font(fonts.regular)
       .text(`Page ${i + 1} of ${range.count}`, margins.left, pageHeight - 30, { align: 'right', width: contentWidth, lineBreak: false });
       
    // Restore margin
    doc.page.margins.bottom = originalBottomMargin;
  }

  doc.end();
};

module.exports = generatePDF;
