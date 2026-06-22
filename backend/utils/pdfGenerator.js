const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

/**
 * Generates an official NIT Kurukshetra T&P Cell PDF document from submission data.
 * @param {Object} submission - The submission document from MongoDB
 * @param {Object} res - Express response object to pipe the PDF stream into
 */
const generatePDF = (submission, res) => {
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

  // --- Theme & Metrics ---
  const colors = {
    maroon: '#7A0019',
    textDark: '#1E293B',
    textMedium: '#475569',
    textLight: '#64748B',
    bgGray: '#F8FAFC',
    border: '#E2E8F0',
    white: '#FFFFFF',
    green: '#10B981',
    red: '#EF4444'
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

  const formatValue = (val) => {
    if (typeof val === 'string') {
      if (val.startsWith('http://') || val.startsWith('https://')) return val; // URL
      return val;
    }
    return String(val);
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
    if (doc.y + neededHeight > pageHeight - margins.bottom - 40) {
      doc.addPage();
      return true;
    }
    return false;
  };

  // --- Drawing Components ---

  const drawHeader = () => {
    const logoPath = path.join(__dirname, '../../frontend/public/nitkkr-logo.png');
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, margins.left, margins.top, { width: 50 });
    }

    doc.fillColor(colors.textDark).fontSize(16).font(fonts.bold).text('Training & Placement Cell', margins.left, margins.top + 5, { align: 'center' });
    doc.fillColor(colors.textMedium).fontSize(12).font(fonts.regular).text('National Institute of Technology Kurukshetra', margins.left, margins.top + 25, { align: 'center' });
    
    doc.moveTo(margins.left, margins.top + 60)
       .lineTo(pageWidth - margins.right, margins.top + 60)
       .lineWidth(1)
       .strokeColor(colors.maroon)
       .stroke();

    const formTitle = submission.formType === 'JNF' ? 'Job Notification Form (JNF)' : 'Internship Notification Form (INF)';
    doc.fillColor(colors.maroon).fontSize(18).font(fonts.bold).text(formTitle, margins.left, margins.top + 75, { align: 'center' });
    
    doc.fillColor(colors.textDark).fontSize(14).font(fonts.bold).text(submission.companyName || 'Unknown Company', margins.left, margins.top + 105, { align: 'center' });
    doc.fillColor(colors.textLight).fontSize(10).font(fonts.regular).text(`Submitted on: ${new Date(submission.submittedAt).toLocaleDateString()}`, margins.left, margins.top + 125, { align: 'center' });

    doc.y = margins.top + 160;
  };

  const drawSectionHeader = (title) => {
    checkPageBreak(50);
    doc.moveDown(1);
    
    doc.rect(margins.left, doc.y, contentWidth, 24).fill(colors.bgGray);
    doc.moveTo(margins.left, doc.y + 24).lineTo(pageWidth - margins.right, doc.y + 24).lineWidth(1).strokeColor(colors.border).stroke();
    
    doc.fillColor(colors.maroon).fontSize(12).font(fonts.bold).text(title.toUpperCase(), margins.left + 10, doc.y + 6);
    doc.moveDown(1.5);
  };

  const drawBadge = (x, y, text, isYes) => {
    const bgColor = isYes ? '#DCFCE7' : '#FEE2E2';
    const textColor = isYes ? colors.green : colors.red;
    
    doc.roundedRect(x, y - 2, 45, 16, 4).fill(bgColor);
    
    // Draw simple check or cross
    if (isYes) {
      doc.moveTo(x + 6, y + 6).lineTo(x + 9, y + 9).lineTo(x + 14, y + 4).lineWidth(1.5).strokeColor(textColor).stroke();
    } else {
      doc.moveTo(x + 7, y + 4).lineTo(x + 13, y + 10).lineWidth(1.5).strokeColor(textColor).stroke();
      doc.moveTo(x + 13, y + 4).lineTo(x + 7, y + 10).lineWidth(1.5).strokeColor(textColor).stroke();
    }

    doc.fillColor(textColor).fontSize(9).font(fonts.bold).text(text.toUpperCase(), x + 18, y + 2.5);
  };

  const drawGridRow = (key, value, isLast = false) => {
    if (isEmpty(value)) return;
    
    const textHeight = doc.heightOfString(formatValue(value), { width: (contentWidth / 2) - 20, font: fonts.regular, fontSize: 10 });
    const rowHeight = Math.max(20, textHeight + 8);
    
    checkPageBreak(rowHeight);

    const startY = doc.y;
    
    // Key Column
    doc.fillColor(colors.textMedium).fontSize(10).font(fonts.bold).text(formatKey(key), margins.left + 10, startY + 4, { width: (contentWidth / 3) - 20 });
    
    // Value Column
    const valStr = formatValue(value);
    if (valStr.toLowerCase() === 'yes' || valStr.toLowerCase() === 'no') {
      drawBadge(margins.left + (contentWidth / 3), startY + 4, valStr, valStr.toLowerCase() === 'yes');
    } else if (valStr.startsWith('http://') || valStr.startsWith('https://')) {
      doc.fillColor('#2563EB').fontSize(10).font(fonts.regular).text(valStr, margins.left + (contentWidth / 3), startY + 4, { width: (contentWidth * 2/3) - 10, link: valStr, underline: true });
    } else {
      doc.fillColor(colors.textDark).fontSize(10).font(fonts.regular).text(valStr, margins.left + (contentWidth / 3), startY + 4, { width: (contentWidth * 2/3) - 10 });
    }
    
    doc.y = startY + rowHeight;
    
    if (!isLast) {
      doc.moveTo(margins.left + 10, doc.y).lineTo(pageWidth - margins.right - 10, doc.y).lineWidth(0.5).strokeColor(colors.border).stroke();
      doc.y += 4;
    }
  };

  // --- Document Assembly ---
  const data = submission.formData;
  
  drawHeader();

  // 1. Company Information & Eligibility Criteria
  const sections = [
    { title: 'Company Information', keys: ['companyName', 'emailAddress', 'website', 'companyType', 'companyTypeOther', 'domain', 'domainOther', 'organisationDescription'] },
    { title: 'Eligibility Criteria', keys: ['minimumCGPA', 'medicalCondition', 'otherCriteria'] },
    { title: 'Recruitment Process', keys: ['resumeShortlisting', 'prePlacementTalk', 'groupDiscussion', 'aptitudeTest', 'testMode', 'technicalTest', 'technicalInterview', 'hrInterview', 'otherRounds', 'expectedRecruits', 'tentativeVisitDate', 'accommodationRequired', 'bondDetails'] },
    { title: 'Additional Details', keys: ['sponsorEvents', 'internshipsOffered', 'internshipStreams', 'internshipDuration', 'studentContests', 'contestDetails'] }
  ];

  sections.forEach(section => {
    const validKeys = section.keys.filter(k => !isEmpty(data[k]));
    if (validKeys.length > 0) {
      drawSectionHeader(section.title);
      // Border around grid
      const gridStartY = doc.y;
      validKeys.forEach((k, idx) => {
        drawGridRow(k, data[k], idx === validKeys.length - 1);
      });
      // Outer border box for section
      doc.roundedRect(margins.left, gridStartY - 4, contentWidth, doc.y - gridStartY + 4, 4).lineWidth(1).strokeColor(colors.border).stroke();
      doc.moveDown(2);
    }
  });

  // 2. Contact Persons (Side-by-side cards)
  if (!isEmpty(data.contacts)) {
    const validContacts = data.contacts.filter(c => !isEmpty(c.name) || !isEmpty(c.email));
    if (validContacts.length > 0) {
      drawSectionHeader('Contact Persons');
      
      const cardWidth = (contentWidth - 20) / 2;
      let col = 0;
      let startY = doc.y;
      let maxCardHeight = 0;

      validContacts.forEach((contact, idx) => {
        if (col === 0 && idx > 0) {
          startY = doc.y + maxCardHeight + 15;
          maxCardHeight = 0;
          doc.y = startY;
        }
        
        checkPageBreak(100);
        if (doc.y !== startY && col === 0) startY = doc.y; // Update if page break happened

        const x = margins.left + (col * (cardWidth + 20));
        let y = startY;

        // Card Header
        doc.roundedRect(x, y, cardWidth, 24, 4).fill(colors.bgGray);
        doc.fillColor(colors.maroon).fontSize(10).font(fonts.bold).text(`Contact ${idx + 1}`, x + 10, y + 7);
        y += 30;

        const keys = Object.keys(contact).filter(k => !isEmpty(contact[k]));
        keys.forEach(k => {
          doc.fillColor(colors.textLight).fontSize(8).font(fonts.bold).text(formatKey(k).toUpperCase(), x + 10, y);
          doc.fillColor(colors.textDark).fontSize(10).font(fonts.regular).text(String(contact[k]), x + 10, y + 12, { width: cardWidth - 20 });
          y += 30;
        });

        const currentHeight = y - startY + 10;
        if (currentHeight > maxCardHeight) maxCardHeight = currentHeight;
        
        doc.roundedRect(x, startY, cardWidth, currentHeight, 6).lineWidth(1).strokeColor(colors.border).stroke();
        
        col = (col + 1) % 2;
      });
      doc.y = startY + maxCardHeight + 20;
    }
  }

  // 3. Branches & Specializations (Chips)
  const branchKeys = { 'ugBranches': 'Eligible UG Branches', 'minorDegrees': 'Eligible Minor Degrees', 'pgSpecializations': 'Eligible PG Specializations' };
  
  Object.entries(branchKeys).forEach(([key, title]) => {
    if (!isEmpty(data[key])) {
      drawSectionHeader(title);
      
      let x = margins.left;
      let y = doc.y;
      const chipHeight = 24;
      
      data[key].forEach(item => {
        if (isEmpty(item)) return;
        const textWidth = doc.widthOfString(item, { font: fonts.regular, fontSize: 9 });
        const chipWidth = textWidth + 20;
        
        if (x + chipWidth > pageWidth - margins.right) {
          x = margins.left;
          y += chipHeight + 10;
          checkPageBreak(chipHeight + 10);
          if (doc.y !== y) y = doc.y; // Account for page break
        }
        
        doc.roundedRect(x, y, chipWidth, chipHeight, 12).fill(colors.bgGray).lineWidth(1).strokeColor(colors.border).stroke();
        doc.fillColor(colors.textDark).fontSize(9).font(fonts.regular).text(item, x + 10, y + 7);
        
        x += chipWidth + 10;
      });
      doc.y = y + chipHeight + 20;
    }
  });

  // 4. Internship / Job Profiles
  const profileKeys = { 'jobProfiles': 'Job Profiles', 'internshipProfiles': 'Internship Profiles' };
  
  Object.entries(profileKeys).forEach(([pk, title]) => {
    if (!isEmpty(data[pk])) {
      const validProfiles = Object.entries(data[pk]).filter(([course, details]) => !isEmpty(details.designation));
      
      if (validProfiles.length > 0) {
        drawSectionHeader(title);
        
        validProfiles.forEach(([course, details]) => {
          checkPageBreak(120);
          
          const startY = doc.y;
          
          // Profile Card Header
          doc.roundedRect(margins.left, startY, contentWidth, 30, 6).fill(colors.bgGray);
          doc.fillColor(colors.maroon).fontSize(12).font(fonts.bold).text(`Profile for ${course.toUpperCase()}`, margins.left + 15, startY + 9);
          
          let y = startY + 40;
          
          const detailKeys = Object.keys(details).filter(k => !isEmpty(details[k]));
          
          // Render in a 2-column grid format inside the card
          const colWidth = (contentWidth - 40) / 2;
          let colIndex = 0;
          let rowY = y;
          let maxRowHeight = 0;
          
          detailKeys.forEach((k, i) => {
            const currentX = margins.left + 15 + (colIndex * (colWidth + 10));
            
            doc.fillColor(colors.textLight).fontSize(8).font(fonts.bold).text(formatKey(k).toUpperCase(), currentX, rowY);
            const textHeight = doc.heightOfString(String(details[k]), { width: colWidth, font: fonts.regular, fontSize: 10 });
            doc.fillColor(colors.textDark).fontSize(10).font(fonts.regular).text(String(details[k]), currentX, rowY + 12, { width: colWidth });
            
            const itemHeight = 12 + textHeight + 15;
            if (itemHeight > maxRowHeight) maxRowHeight = itemHeight;
            
            if (colIndex === 1 || i === detailKeys.length - 1) {
              rowY += maxRowHeight;
              maxRowHeight = 0;
              colIndex = 0;
            } else {
              colIndex = 1;
            }
          });
          
          const cardHeight = rowY - startY + 10;
          doc.roundedRect(margins.left, startY, contentWidth, cardHeight, 6).lineWidth(1).strokeColor(colors.border).stroke();
          
          doc.y = startY + cardHeight + 20;
        });
      }
    }
  });

  // --- Add Footers to all pages ---
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    
    const originalBottomMargin = doc.page.margins.bottom;
    doc.page.margins.bottom = 0;
    
    doc.moveTo(margins.left, pageHeight - 40)
       .lineTo(pageWidth - margins.right, pageHeight - 40)
       .lineWidth(1)
       .strokeColor(colors.border)
       .stroke();
       
    doc.fillColor(colors.textLight).fontSize(8).font(fonts.bold)
       .text('National Institute of Technology Kurukshetra | Training & Placement Cell', margins.left, pageHeight - 30, { lineBreak: false });
       
    doc.fillColor(colors.textLight).fontSize(8).font(fonts.regular)
       .text(`Page ${i + 1} of ${range.count}`, margins.left, pageHeight - 30, { align: 'right', width: contentWidth, lineBreak: false });
       
    doc.page.margins.bottom = originalBottomMargin;
  }

  doc.end();
};

module.exports = generatePDF;
