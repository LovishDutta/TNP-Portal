const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');


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

  
  const formatKey = (key) => {
    return key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase());
  };

  const formatValue = (val) => {
    if (typeof val === 'string') {
      if (val.startsWith('http://') || val.startsWith('https://')) return val; 
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
    doc
  .fillColor(colors.textLight)
  .fontSize(10)
  .font(fonts.regular)
  .text(
    `Submitted on: ${new Date(submission.submittedAt).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "medium",
    })}`,
    margins.left,
    margins.top + 125,
    { align: "center" }
  );
    doc.y = margins.top + 160;
  };

  const drawSectionHeader = (title) => {
    checkPageBreak(30);
    doc.moveDown(0.5);
    
    const startY = doc.y;
    doc.rect(margins.left, startY, contentWidth, 20).fill(colors.bgGray);
    
    doc.moveTo(margins.left, startY).lineTo(pageWidth - margins.right, startY).lineWidth(1).strokeColor(colors.border).stroke();
    doc.moveTo(margins.left, startY).lineTo(margins.left, startY + 20).lineWidth(1).strokeColor(colors.border).stroke();
    doc.moveTo(pageWidth - margins.right, startY).lineTo(pageWidth - margins.right, startY + 20).lineWidth(1).strokeColor(colors.border).stroke();
    doc.moveTo(margins.left, startY + 20).lineTo(pageWidth - margins.right, startY + 20).lineWidth(1).strokeColor(colors.border).stroke();
    
    doc.fillColor(colors.maroon).fontSize(10).font(fonts.bold).text(title.toUpperCase(), margins.left + 10, startY + 6);
    doc.y = startY + 20;
  };

  const drawBadge = (x, y, text, isYes) => {
    const bgColor = isYes ? '#DCFCE7' : '#FEE2E2';
    const textColor = isYes ? colors.green : colors.red;
    
    doc.roundedRect(x, y - 2, 38, 14, 4).fill(bgColor);
    
    if (isYes) {
      doc.moveTo(x + 5, y + 5).lineTo(x + 8, y + 8).lineTo(x + 13, y + 3).lineWidth(1.2).strokeColor(textColor).stroke();
    } else {
      doc.moveTo(x + 6, y + 3).lineTo(x + 12, y + 9).lineWidth(1.2).strokeColor(textColor).stroke();
      doc.moveTo(x + 12, y + 3).lineTo(x + 6, y + 9).lineWidth(1.2).strokeColor(textColor).stroke();
    }

    doc.fillColor(textColor).fontSize(8).font(fonts.bold).text(text.toUpperCase(), x + 16, y + 1.5);
  };

  const drawGridRowMulti = (keys, isFirst = false, isLast = false) => {
    const colCount = keys.length;
    const colWidth = contentWidth / colCount;
    let maxRowHeight = 18;
    
    keys.forEach(k => {
      const val = data[k];
      const labelWidth = colCount === 1 ? 140 : 100;
      const textWidth = colCount === 1 ? contentWidth - 170 : colWidth - 120;
      
      doc.font(fonts.regular).fontSize(9);
      const valHeight = doc.heightOfString(formatValue(val), { width: textWidth });
      doc.font(fonts.bold).fontSize(9);
      const labelHeight = doc.heightOfString(formatKey(k), { width: labelWidth });
      
      const neededHeight = Math.max(valHeight, labelHeight) + 12;
      if (neededHeight > maxRowHeight) maxRowHeight = neededHeight;
    });

    if (doc.y + maxRowHeight > pageHeight - margins.bottom - 40) {
      if (!isFirst) {
        doc.moveTo(margins.left, doc.y).lineTo(pageWidth - margins.right, doc.y).lineWidth(1).strokeColor(colors.border).stroke();
      }
      doc.addPage();
      doc.moveTo(margins.left, doc.y).lineTo(pageWidth - margins.right, doc.y).lineWidth(1).strokeColor(colors.border).stroke();
    }
    
    const startY = doc.y;

    keys.forEach((k, idx) => {
      const val = data[k];
      const startX = margins.left + (idx * colWidth);
      const labelWidth = colCount === 1 ? 140 : 100;
      const valueX = startX + labelWidth + 10;
      const valueWidth = colCount === 1 ? contentWidth - 170 : colWidth - 120;

      doc.fillColor(colors.textMedium).fontSize(9).font(fonts.bold).text(formatKey(k), startX + 10, startY + 6, { width: labelWidth });
      
      const valStr = formatValue(val);
      if (valStr.toLowerCase() === 'yes' || valStr.toLowerCase() === 'no') {
        drawBadge(valueX, startY + 5, valStr, valStr.toLowerCase() === 'yes');
      } else if (valStr.startsWith('http://') || valStr.startsWith('https://')) {
        doc.fillColor('#2563EB').fontSize(9).font(fonts.regular).text(valStr, valueX, startY + 6, { width: valueWidth, link: valStr, underline: true });
      } else {
        doc.fillColor(colors.textDark).fontSize(9).font(fonts.regular).text(valStr, valueX, startY + 6, { width: valueWidth });
      }

      if (idx === 0 && colCount === 2) {
         doc.moveTo(startX + colWidth, startY).lineTo(startX + colWidth, startY + maxRowHeight).lineWidth(0.5).strokeColor(colors.border).stroke();
      }
    });
    
    doc.y = startY + maxRowHeight;
    
    doc.moveTo(margins.left, startY).lineTo(margins.left, doc.y).lineWidth(1).strokeColor(colors.border).stroke();
    doc.moveTo(pageWidth - margins.right, startY).lineTo(pageWidth - margins.right, doc.y).lineWidth(1).strokeColor(colors.border).stroke();
    
    if (isLast) {
      doc.moveTo(margins.left, doc.y).lineTo(pageWidth - margins.right, doc.y).lineWidth(1).strokeColor(colors.border).stroke();
    } else {
      doc.moveTo(margins.left, doc.y).lineTo(pageWidth - margins.right, doc.y).lineWidth(0.5).strokeColor(colors.border).stroke();
    }
  };

  
  const data = submission.formData;
  
  drawHeader();

  
  const sections = [
    { title: 'Company Information', keys: ['companyName', 'emailAddress', 'website', 'companyType', 'companyTypeOther', 'domain', 'domainOther', 'organisationDescription', 'internshipType'] },
    { title: 'Eligibility Criteria', keys: ['minimumCGPA', 'backlogsAllowed', 'historyOfBacklogsAllowed', 'medicalCondition', 'otherCriteria'] },
    { title: 'Recruitment Process', keys: ['resumeShortlisting', 'prePlacementTalk', 'groupDiscussion', 'aptitudeTest', 'testMode', 'technicalTest', 'technicalInterview', 'hrInterview', 'otherRounds', 'expectedRecruits', 'tentativeVisitDate', 'accommodationRequired', 'bondDetails'] },
    { title: 'Additional Details', keys: ['internshipsOffered', 'internshipStreams', 'internshipDuration', 'studentContests', 'contestDetails'] }
  ];

  sections.forEach(section => {
    const validKeys = section.keys.filter(k => !isEmpty(data[k]));
    if (validKeys.length > 0) {
      let gridRows = [];
      let currentRow = [];
      const longTextKeys = ['minimumCGPA', 'organisationDescription', 'medicalCondition', 'otherCriteria', 'bondDetails', 'contestDetails'];
      
      validKeys.forEach((k) => {
        if (longTextKeys.includes(k)) {
          if (currentRow.length > 0) { gridRows.push(currentRow); currentRow = []; }
          gridRows.push([k]);
        } else {
          currentRow.push(k);
          if (currentRow.length === 2) { gridRows.push(currentRow); currentRow = []; }
        }
      });
      if (currentRow.length > 0) { gridRows.push(currentRow); }

      let requiredHeight = 80; 
      checkPageBreak(requiredHeight);

      drawSectionHeader(section.title);
      
      gridRows.forEach((row, idx) => {
        drawGridRowMulti(row, idx === 0, idx === gridRows.length - 1);
      });
      
      doc.moveDown(1.5);
    }
  });

  
  if (!isEmpty(data.contacts)) {
    const validContacts = data.contacts.filter(c => !isEmpty(c.name) || !isEmpty(c.email));
    if (validContacts.length > 0) {
      drawSectionHeader('Contact Persons');
      
      const cardWidth = (contentWidth - 20) / 2;
      let col = 0;
      let startY = doc.y;
      let maxCardHeight = 0;

      validContacts.forEach((contact, idx) => {
        const keys = Object.keys(contact).filter(k => !isEmpty(contact[k]));
        
        
        let requiredHeight = 25; 
        keys.forEach(k => {
          doc.font(fonts.regular).fontSize(9);
          const tH = doc.heightOfString(String(contact[k]), { width: cardWidth - 20 });
          requiredHeight += 8 + tH + 6;
        });

        if (col === 0 && idx > 0) {
          startY = doc.y + maxCardHeight + 10;
          maxCardHeight = 0;
          doc.y = startY;
        }
        
        if (checkPageBreak(requiredHeight + 20)) {
           startY = doc.y; 
           if (col === 1) col = 0; 
        }

        const x = margins.left + (col * (cardWidth + 10));
        let y = startY;

        doc.roundedRect(x, y, cardWidth, 20, 4).fill(colors.bgGray);
        doc.fillColor(colors.maroon).fontSize(9).font(fonts.bold).text(`Contact ${idx + 1}`, x + 10, y + 5);
        y += 24;

        keys.forEach(k => {
          doc.fillColor(colors.textLight).fontSize(7).font(fonts.bold).text(formatKey(k).toUpperCase(), x + 10, y);
          const tH = doc.heightOfString(String(contact[k]), { width: cardWidth - 20, font: fonts.regular, fontSize: 9 });
          doc.fillColor(colors.textDark).fontSize(9).font(fonts.regular).text(String(contact[k]), x + 10, y + 10, { width: cardWidth - 20 });
          y += 10 + tH + 6;
        });

        const currentHeight = y - startY + 5;
        if (currentHeight > maxCardHeight) maxCardHeight = currentHeight;
        
        doc.roundedRect(x, startY, cardWidth, currentHeight, 6).lineWidth(1).strokeColor(colors.border).stroke();
        
        col = (col + 1) % 2;
      });
      doc.y = startY + maxCardHeight + 15;
    }
  }

  
  const branchKeys = { 'ugBranches': 'Eligible UG Branches', 'minorDegrees': 'Eligible Minor Degrees', 'pgSpecializations': 'Eligible PG Specializations', 'dualDegreeBranches': 'Eligible Dual Degree Branches' };
  
  Object.entries(branchKeys).forEach(([key, title]) => {
    if (!isEmpty(data[key])) {
      const chipHeight = 18;
      let requiredHeight = 40; 
      let tempX = margins.left + 10;
      let tempY = 0;
      
      data[key].forEach(item => {
        if (isEmpty(item)) return;
        const textWidth = doc.widthOfString(item, { font: fonts.regular, fontSize: 8 });
        const chipWidth = textWidth + 16;
        if (tempX + chipWidth > pageWidth - margins.right - 10) {
          tempX = margins.left + 10;
          tempY += chipHeight + 6;
        }
        tempX += chipWidth + 6;
      });
      requiredHeight += tempY + chipHeight + 10;
      
      checkPageBreak(requiredHeight);

      drawSectionHeader(title);
      
      const gridStartY = doc.y;
      let x = margins.left + 10;
      let y = gridStartY + 8;
      
      data[key].forEach(item => {
        if (isEmpty(item)) return;
        const textWidth = doc.widthOfString(item, { font: fonts.regular, fontSize: 8 });
        const chipWidth = textWidth + 16;
        
        if (x + chipWidth > pageWidth - margins.right - 10) {
          x = margins.left + 10;
          y += chipHeight + 6;
        }
        
        doc.roundedRect(x, y, chipWidth, chipHeight, 9).lineWidth(1).fillAndStroke(colors.bgGray, colors.border);
        doc.fillColor(colors.textDark).fontSize(8).font(fonts.regular).text(item, x + 8, y + 5);
        
        x += chipWidth + 6;
      });
      
      doc.y = y + chipHeight + 8;
      doc.moveTo(margins.left, gridStartY).lineTo(margins.left, doc.y).lineWidth(1).strokeColor(colors.border).stroke();
      doc.moveTo(pageWidth - margins.right, gridStartY).lineTo(pageWidth - margins.right, doc.y).lineWidth(1).strokeColor(colors.border).stroke();
      doc.moveTo(margins.left, doc.y).lineTo(pageWidth - margins.right, doc.y).lineWidth(1).strokeColor(colors.border).stroke();
      doc.moveDown(1.5);
    }
  });

  
  const profileKeys = { 'jobProfiles': 'Job Profiles', 'internshipProfiles': 'Internship Profiles' };
  
  Object.entries(profileKeys).forEach(([pk, title]) => {
    if (!isEmpty(data[pk])) {
      const validProfiles = Object.entries(data[pk]).filter(([course, details]) => !isEmpty(details.designation));
      
      if (validProfiles.length > 0) {
        drawSectionHeader(title);
        
        validProfiles.forEach(([course, details]) => {
          const detailKeys = Object.keys(details).filter(k => !isEmpty(details[k]));
          const colWidth = (contentWidth - 40) / 2;
          
          let requiredHeight = 35; 
          let tempRowMax = 0;
          let tempCol = 0;
          
          detailKeys.forEach((k, i) => {
             doc.font(fonts.regular).fontSize(9);
             const tH = doc.heightOfString(String(details[k]), { width: colWidth });
             const itemHeight = 10 + tH + 10;
             if (itemHeight > tempRowMax) tempRowMax = itemHeight;
             if (tempCol === 1 || i === detailKeys.length - 1) {
                requiredHeight += tempRowMax;
                tempRowMax = 0;
                tempCol = 0;
             } else {
                tempCol = 1;
             }
          });
          
          checkPageBreak(requiredHeight + 15);
          
          const startY = doc.y;
          
          doc.roundedRect(margins.left, startY, contentWidth, 24, 6).fill(colors.bgGray);
          doc.fillColor(colors.maroon).fontSize(10).font(fonts.bold).text(`Profile for ${course.toUpperCase()}`, margins.left + 10, startY + 7);
          
          let y = startY + 30;
          
          let colIndex = 0;
          let rowY = y;
          let maxRowHeight = 0;
          
          detailKeys.forEach((k, i) => {
            const currentX = margins.left + 10 + (colIndex * (colWidth + 10));
            
            doc.fillColor(colors.textLight).fontSize(7).font(fonts.bold).text(formatKey(k).toUpperCase(), currentX, rowY);
            const textHeight = doc.heightOfString(String(details[k]), { width: colWidth, font: fonts.regular, fontSize: 9 });
            doc.fillColor(colors.textDark).fontSize(9).font(fonts.regular).text(String(details[k]), currentX, rowY + 10, { width: colWidth });
            
            const itemHeight = 10 + textHeight + 10;
            if (itemHeight > maxRowHeight) maxRowHeight = itemHeight;
            
            if (colIndex === 1 || i === detailKeys.length - 1) {
              rowY += maxRowHeight;
              maxRowHeight = 0;
              colIndex = 0;
            } else {
              colIndex = 1;
            }
          });
          
          const cardHeight = rowY - startY + 6;
          doc.roundedRect(margins.left, startY, contentWidth, cardHeight, 6).lineWidth(1).strokeColor(colors.border).stroke();
          
          doc.y = startY + cardHeight + 12;
        });
      }
    }
  });

  // Important Mentions (policies) — shown just before the Undertaking section
  checkPageBreak(150);
  drawSectionHeader('Important Mentions');
  doc.moveDown(0.3);

  doc.fillColor(colors.textDark).fontSize(9).font(fonts.regular);
  doc.list(
    [
      'As per our latest curriculum, B.Tech students are available for internships with a minimum duration of 16 weeks.',
      'M.Tech students are available for 6/11-month internship.',
      'MCA students are available for 6-month internship (in their last semester).',
      'All information provided in the notification forms must be accurate and verifiable.',
      'Once submitted, forms cannot be modified without prior approval from the Training & Placement Cell.',
      'Companies are expected to adhere strictly to the agreed-upon compensation structure.',
      'Pre-Placement Offers (PPOs) must be routed exclusively through the Training & Placement Cell.',
      'Second Offer Policy:',
      [
        "The new opportunity must offer a CTC of at least 1.5x the student's current offer.",
        "The student's existing offer must have a CTC of \u20b912 LPA or below.",
        'At least 50% of students from the respective department must have already been placed at the time of recruitment.',
        'If 80% or more students of a department have already been placed, the remaining eligible students of that department shall be permitted to participate in all subsequent campus recruitment drives, including PSU/Government Organization recruitment, irrespective of their existing CTC.'
      ],
      'PSU Recruitment Policy:',
      [
        'Students who have already secured an on-campus offer shall remain eligible to participate in recruitment drives conducted by Public Sector Undertakings (PSUs) and Government Organizations, subject to the eligibility criteria prescribed by the recruiting organization.',
        'Once a student receives an offer from a PSU/Government Organization, the student shall not be permitted to participate in the recruitment process of any other PSU/Government Organization.'
      ],
      'Bonus Company Policy: Companies offering a CTC of \u20b95 LPA or below shall be classified as Bonus Companies. Students selected by a Bonus Company shall remain eligible to participate in all subsequent campus recruitment drives offering a higher CTC without any restriction arising from their earlier selection.'
    ],
    margins.left + 10,
    doc.y,
    {
      width: contentWidth - 20,
      bulletRadius: 2,
      textIndent: 10,
      indent: 14,
      lineGap: 3
    }
  );

  doc.moveDown(1.2);

  // Undertaking Section
  const declarationText = "I hereby declare that the information provided in this form is true and correct to the best of my knowledge. I have read and understand all the provided important mentions from the TNP Recruitment Portal."

  
  checkPageBreak(150);
  drawSectionHeader('Undertaking');
  
  const undertakingStartY = doc.y;
  
  doc.fillColor(colors.textDark).fontSize(10).font(fonts.regular).text(declarationText, margins.left + 10, doc.y + 10, { width: contentWidth - 20, align: 'justify' });
  
  doc.moveDown(1.5);
  
  // Statuses
  doc.fillColor(colors.textMedium).fontSize(10).font(fonts.bold).text("Undertaking Accepted:", margins.left + 10, doc.y, { continued: true });
  doc.fillColor(colors.textDark).font(fonts.regular).text(` ${data.undertakingAccepted ? 'Yes' : 'No'}`);
  doc.moveDown(0.8);

  doc.fillColor(colors.textMedium).fontSize(10).font(fonts.bold).text("Name of Form Filler:", margins.left + 10, doc.y, { continued: true });
  doc.fillColor(colors.textDark).font(fonts.regular).text(` ${data.formFillerName || 'N/A'}`);
  doc.moveDown(0.8);

  doc.fillColor(colors.textMedium).fontSize(10).font(fonts.bold).text("Designation:", margins.left + 10, doc.y, { continued: true });
  doc.fillColor(colors.textDark).font(fonts.regular).text(` ${data.formFillerDesignation || 'N/A'}`);
  doc.moveDown(0.8);
  
  doc.fillColor(colors.textMedium).fontSize(10).font(fonts.bold).text("Submitted On:", margins.left + 10, doc.y, { continued: true });
  doc.fillColor(colors.textDark).font(fonts.regular).text(` ${new Date(submission.submittedAt).toLocaleString()}`);
  
  doc.y += 10;
  
  doc.moveTo(margins.left, undertakingStartY).lineTo(margins.left, doc.y).lineWidth(1).strokeColor(colors.border).stroke();
  doc.moveTo(pageWidth - margins.right, undertakingStartY).lineTo(pageWidth - margins.right, doc.y).lineWidth(1).strokeColor(colors.border).stroke();
  doc.moveTo(margins.left, doc.y).lineTo(pageWidth - margins.right, doc.y).lineWidth(1).strokeColor(colors.border).stroke();
  
  doc.moveDown(2);

  
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