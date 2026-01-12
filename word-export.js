// Word Export Module - Simplified and Working Version

async function exportToWord() {
  try {
    showLoading('Generating Word document...');

    // Get data directly from form fields (current state, not just saved)
    const getFieldValue = (id) => {
      const el = document.getElementById(id);
      return el ? el.value : '';
    };

    const getSelectValue = (id) => {
      const el = document.getElementById(id);
      return el ? el.value : '';
    };

    // Build report object from current form state
    const report = {
      poNumber: getFieldValue('poNumber') || 'Report',
      client: getFieldValue('client'),
      productName: getFieldValue('productName'),
      importer: getFieldValue('importer'),
      location: getFieldValue('location'),
      instruction: getFieldValue('instruction'),
      styleNo: getFieldValue('styleNo'),
      inspectionDate: getFieldValue('inspectionDate'),
      poNumberDetail: getFieldValue('poNumberDetail'),
      cartonsInspected: getFieldValue('cartonsInspected'),
      orderQuantity: getFieldValue('orderQuantity'),
      quantityInspection: getFieldValue('quantityInspection'),
      inspection: getFieldValue('inspection'),
      inspectionType: getFieldValue('inspectionType'),
      samplingStandard: getFieldValue('samplingStandard'),
      samplingLevel: getFieldValue('samplingLevel'),
      aqlCritical: getFieldValue('aqlCritical'),
      criticalChecked: getFieldValue('criticalChecked'),
      aqlMajor: getFieldValue('aqlMajor'),
      majorChecked: getFieldValue('majorChecked'),
      aqlMinor: getFieldValue('aqlMinor'),
      minorChecked: getFieldValue('minorChecked'),
      samplingPlan: getFieldValue('samplingPlan'),
      priorQuantity: getFieldValue('priorQuantity'),
      quantityCartons: getFieldValue('quantityCartons'),
      cartonsInspectedCount: getFieldValue('cartonsInspectedCount'),
      overallResult: getFieldValue('overallResult'),
      workmanshipCritical: getFieldValue('workmanshipCritical'),
      workmanshipMajor: getFieldValue('workmanshipMajor'),
      workmanshipMinor: getFieldValue('workmanshipMinor'),
      overAqlCritical: getFieldValue('overAqlCritical'),
      overAqlMajor: getFieldValue('overAqlMajor'),
      overAqlMinor: getFieldValue('overAqlMinor'),
      checkedCritical: getFieldValue('checkedCritical'),
      checkedMajor: getFieldValue('checkedMajor'),
      checkedMinor: getFieldValue('checkedMinor'),
      quantityResult: getSelectValue('quantityResult'),
      colorResult: getSelectValue('colorResult'),
      dimensionResult: getSelectValue('dimensionResult'),
      dimensionComment: getFieldValue('dimensionComment'),
      packingResult: getSelectValue('packingResult'),
      packingComment: getFieldValue('packingComment'),
      foldingResult: getSelectValue('foldingResult'),
      foldingComment: getFieldValue('foldingComment'),
      labelResult: getSelectValue('labelResult'),
      labelComment: getFieldValue('labelComment'),
      ctnMeasureResult: getSelectValue('ctnMeasureResult'),
      ctnMeasureComment: getFieldValue('ctnMeasureComment'),
      otherRemarks: getFieldValue('otherRemarks'),
      packingQtyPacked: getFieldValue('packingQtyPacked'),
      packingQtyFinished: getFieldValue('packingQtyFinished'),
      packingQtySemi: getFieldValue('packingQtySemi'),
      colorWhiteResult: getSelectValue('colorWhiteResult'),
      colorWhiteComment: getFieldValue('colorWhiteComment'),
      colorBlackResult: getSelectValue('colorBlackResult'),
      colorBlackComment: getFieldValue('colorBlackComment'),
      dimSResult: getSelectValue('dimSResult'),
      dimSComment: getFieldValue('dimSComment'),
      dimMResult: getSelectValue('dimMResult'),
      dimMComment: getFieldValue('dimMComment'),
      dimLResult: getSelectValue('dimLResult'),
      dimLComment: getFieldValue('dimLComment'),
      dim2XLResult: getSelectValue('dim2XLResult'),
      dim2XLComment: getFieldValue('dim2XLComment'),
      dim4XLResult: getSelectValue('dim4XLResult'),
      dim4XLComment: getFieldValue('dim4XLComment'),
      boys12_13Result: getSelectValue('boys12_13Result'),
      boys12_13Comment: getFieldValue('boys12_13Comment'),
      boys14_15Result: getSelectValue('boys14_15Result'),
      boys14_15Comment: getFieldValue('boys14_15Comment'),
      boys16_17Result: getSelectValue('boys16_17Result'),
      boys16_17Comment: getFieldValue('boys16_17Comment'),
      boys19MResult: getSelectValue('boys19MResult'),
      boys19MComment: getFieldValue('boys19MComment'),
      boys23MResult: getSelectValue('boys23MResult'),
      boys23MComment: getFieldValue('boys23MComment'),
      ctnMarksResult: getSelectValue('ctnMarksResult'),
      ctnMarksComment: getFieldValue('ctnMarksComment'),
      exportCartonResult: getSelectValue('exportCartonResult'),
      exportCartonComment: getFieldValue('exportCartonComment'),
      maxWeightResult: getSelectValue('maxWeightResult'),
      maxWeightComment: getFieldValue('maxWeightComment')
    };

    const poNumber = report.poNumber || 'Report';
    
    // Get images from DOM (current state) - this ensures we get all images even if not saved
    const imagesBySection = {};
    const sectionNames = [
      'product-main', 'packing-list', 'colors', 'measurements',
      'carton-marks', 'folding', 'care-label', 'sharding',
      'price-tickets', 'ctn-barcode', 'gsm', 'ctn-measurements', 'factory'
    ];
    
    sectionNames.forEach(sectionName => {
      const container = document.getElementById(`images-${sectionName}`);
      if (container) {
        const imageItems = container.querySelectorAll('.image-item img');
        if (imageItems.length > 0) {
          imagesBySection[sectionName] = [];
          imageItems.forEach((img, index) => {
            imagesBySection[sectionName].push({
              imageData: img.src,
              section: sectionName,
              index: index
            });
          });
        }
      }
    });

    // Helper function to render images for a section (clean, structured format)
    const renderSectionImages = (sectionName) => {
      const sectionImages = imagesBySection[sectionName] || [];
      if (sectionImages.length === 0) return '';
      
      let html = '<div style="margin:10pt 0;page-break-inside:avoid;">';
      html += '<table style="width:100%;border-collapse:collapse;margin:8pt 0;border:none;">';
      
      // Render images in a grid (2 per row, cleaner style)
      for (let i = 0; i < sectionImages.length; i += 2) {
        html += '<tr>';
        for (let j = 0; j < 2 && (i + j) < sectionImages.length; j++) {
          const img = sectionImages[i + j];
          html += `
            <td style="width:50%;padding:5pt;text-align:center;vertical-align:top;border:1px solid #ddd;">
              <img src="${img.imageData}" style="max-width:100%;height:auto;max-height:150pt;display:block;margin:0 auto;" alt="Image">
            </td>
          `;
        }
        // Fill empty cell if odd number
        if (sectionImages.length % 2 !== 0 && i + 1 === sectionImages.length) {
          html += '<td style="width:50%;border:none;"></td>';
        }
        html += '</tr>';
      }
      html += '</table></div>';
      return html;
    };

    // Get defect rows from the form table
    const defectRowsHtml = getDefectRows();

    // Create HTML content that Word can open
    const htmlContent = `
<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>Inspection Report - ${poNumber}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page {
      size: A4;
      margin: 2cm;
    }
    body {
      font-family: Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.4;
      color: #000;
    }
    h1 {
      text-align: center;
      color: #dc3545;
      font-size: 18pt;
      margin-bottom: 10pt;
    }
    h2 {
      background: #dc3545;
      color: white;
      padding: 10pt 12pt;
      font-size: 14pt;
      font-weight: bold;
      margin-top: 20pt;
      margin-bottom: 12pt;
      border-left: 4pt solid #c82333;
    }
    h1 {
      color: #dc3545;
      font-size: 20pt;
      font-weight: bold;
      margin: 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10pt 0;
      page-break-inside: avoid;
      border: 1px solid #333;
    }
    td, th {
      border: 1px solid #333;
      padding: 8pt;
      font-size: 10pt;
    }
    th {
      background: #dc3545;
      color: white;
      font-weight: bold;
      text-align: center;
    }
    .label {
      background: #f8f9fa;
      font-weight: bold;
      width: 30%;
      color: #333;
    }
    .section-header {
      background: #dc3545;
      color: white;
      padding: 8pt;
      font-weight: bold;
      margin-top: 15pt;
      margin-bottom: 5pt;
    }
    .page-break {
      page-break-before: always;
    }
    .result-box {
      background: #f0f0f0;
      border: 2px solid #333;
      padding: 10pt;
      margin: 10pt 0;
      text-align: center;
      font-weight: bold;
    }
    .image-note {
      background: #fff9e6;
      border: 1px solid #ffc107;
      padding: 10pt;
      margin: 10pt 0;
      font-style: italic;
    }
    .important-note {
      background: #dc3545;
      color: white;
      padding: 10pt;
      margin: 15pt 0;
      font-size: 9pt;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  
  <div style="text-align:center;border-bottom:3px solid #dc3545;padding-bottom:15pt;margin-bottom:20pt;">
    <h1 style="color:#dc3545;margin:0;font-size:20pt;">India QC Team</h1>
    <h2 style="margin:5pt 0;font-size:16pt;">Inspection Report (PSI)</h2>
    <div style="text-align:right;margin-top:10pt;">
      <strong>PO#: ${escapeHtml(poNumber)}</strong>
    </div>
  </div>

  <h2 style="margin-top:20pt;">PRODUCT DESCRIPTION</h2>
  
  <table style="margin-bottom:15pt;">
    <tr>
      <td class="label" style="width:35%;">Client</td>
      <td style="width:65%;">${escapeHtml(report.client || '')}</td>
    </tr>
    <tr>
      <td class="label">Product Name</td>
      <td>${escapeHtml(report.productName || '')}</td>
    </tr>
    <tr>
      <td class="label">Importer</td>
      <td>${escapeHtml(report.importer || '')}</td>
    </tr>
    <tr>
      <td class="label">Location</td>
      <td>${escapeHtml(report.location || '')}</td>
    </tr>
    <tr>
      <td class="label">Instruction</td>
      <td>${escapeHtml(report.instruction || '')}</td>
    </tr>
    <tr>
      <td class="label">Style No.</td>
      <td>${escapeHtml(report.styleNo || '')}</td>
    </tr>
    <tr>
      <td class="label">Inspection Date</td>
      <td>${escapeHtml(report.inspectionDate || '')}</td>
    </tr>
    <tr>
      <td class="label">P/O Number</td>
      <td>${escapeHtml(report.poNumberDetail || '')}</td>
    </tr>
    <tr>
      <td class="label">Cartons Inspected</td>
      <td>${escapeHtml(report.cartonsInspected || '')}</td>
    </tr>
    <tr>
      <td class="label">Order Quantity</td>
      <td>${escapeHtml(report.orderQuantity || '')}</td>
    </tr>
    <tr>
      <td class="label">Quantity for Inspection</td>
      <td>${escapeHtml(report.quantityInspection || '')}</td>
    </tr>
  </table>
  
  ${renderSectionImages('product-main')}
  
  <div class="page-break"></div>
    <tr>
      <td class="label">Client</td>
      <td>${escapeHtml(report.client || '')}</td>
    </tr>
    <tr>
      <td class="label">Product Name</td>
      <td>${escapeHtml(report.productName || '')}</td>
    </tr>
    <tr>
      <td class="label">Importer</td>
      <td>${escapeHtml(report.importer || '')}</td>
    </tr>
    <tr>
      <td class="label">Location</td>
      <td>${escapeHtml(report.location || '')}</td>
    </tr>
    <tr>
      <td class="label">Instruction</td>
      <td>${escapeHtml(report.instruction || '')}</td>
    </tr>
    <tr>
      <td class="label">Style No.</td>
      <td>${escapeHtml(report.styleNo || '')}</td>
    </tr>
    <tr>
      <td class="label">Inspection Date</td>
      <td>${escapeHtml(report.inspectionDate || '')}</td>
    </tr>
    <tr>
      <td class="label">P/O Number</td>
      <td>${escapeHtml(report.poNumberDetail || '')}</td>
    </tr>
    <tr>
      <td class="label">Cartons Inspected</td>
      <td>${escapeHtml(report.cartonsInspected || '')}</td>
    </tr>
    <tr>
      <td class="label">Order Quantity</td>
      <td>${escapeHtml(report.orderQuantity || '')}</td>
    </tr>
    <tr>
      <td class="label">Quantity for Inspection</td>
      <td>${escapeHtml(report.quantityInspection || '')}</td>
    </tr>
  </table>

  <h2>INSPECTION STANDARDS</h2>
  
  <table style="margin-bottom:15pt;">
    <tr>
      <td class="label">Inspection Type</td>
      <td>${escapeHtml(report.inspectionType || '')}</td>
    </tr>
    <tr>
      <td class="label">Sampling Standard</td>
      <td>${escapeHtml(report.samplingStandard || '')}</td>
    </tr>
    <tr>
      <td class="label">Sampling Level</td>
      <td>${escapeHtml(report.samplingLevel || '')}</td>
    </tr>
    <tr>
      <td class="label">AQL for Critical Defect</td>
      <td>${escapeHtml(report.aqlCritical || '')}</td>
    </tr>
    <tr>
      <td class="label">Critical Checked</td>
      <td>${escapeHtml(report.criticalChecked || '')}</td>
    </tr>
    <tr>
      <td class="label">AQL for Major Defective</td>
      <td>${escapeHtml(report.aqlMajor || '')}</td>
    </tr>
    <tr>
      <td class="label">Major Checked</td>
      <td>${escapeHtml(report.majorChecked || '')}</td>
    </tr>
    <tr>
      <td class="label">AQL for Minor Defective</td>
      <td>${escapeHtml(report.aqlMinor || '')}</td>
    </tr>
    <tr>
      <td class="label">Minor Checked</td>
      <td>${escapeHtml(report.minorChecked || '')}</td>
    </tr>
    <tr>
      <td class="label">Sampling Plan & Criteria</td>
      <td>${escapeHtml(report.samplingPlan || '')}</td>
    </tr>
    <tr>
      <td class="label">Quantity & Cartons Available</td>
      <td>${escapeHtml(report.quantityCartons || '')}</td>
    </tr>
    <tr>
      <td class="label">No. of Cartons Inspected</td>
      <td>${escapeHtml(report.cartonsInspectedCount || '')}</td>
    </tr>
  </table>

  <div class="page-break"></div>

  <h2>INSPECTION RESULT SUMMARY</h2>
  
  <div class="result-box" style="margin:15pt 0;">
    <p style="margin:0;font-size:12pt;">OVERALL INSPECTION RESULT: <span style="font-size:16pt;font-weight:bold;">${escapeHtml(report.overallResult || 'Pending')}</span></p>
  </div>

  <table style="margin-bottom:15pt;">
    <thead>
      <tr>
        <th>Category</th>
        <th>CRITICAL</th>
        <th>MAJOR</th>
        <th>MINOR</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="label">WORKMANSHIP<br>(Defective Unit)</td>
        <td style="text-align:center;">${escapeHtml(report.workmanshipCritical || '0')}</td>
        <td style="text-align:center;">${escapeHtml(report.workmanshipMajor || '')}</td>
        <td style="text-align:center;">${escapeHtml(report.workmanshipMinor || '')}</td>
      </tr>
      <tr>
        <td class="label">Over AQL</td>
        <td style="text-align:center;">${escapeHtml(report.overAqlCritical || '')}</td>
        <td style="text-align:center;">${escapeHtml(report.overAqlMajor || '')}</td>
        <td style="text-align:center;">${escapeHtml(report.overAqlMinor || '')}</td>
      </tr>
      <tr>
        <td class="label">Checked</td>
        <td style="text-align:center;">${escapeHtml(report.checkedCritical || '')}</td>
        <td style="text-align:center;">${escapeHtml(report.checkedMajor || '')}</td>
        <td style="text-align:center;">${escapeHtml(report.checkedMinor || '')}</td>
      </tr>
    </tbody>
  </table>

  <h2>DEFECT DETAILS</h2>
  
  <table style="margin-bottom:15pt;">
    <thead>
      <tr>
        <th style="width:20%;background:#dc3545;color:white;">Defect Grade</th>
        <th style="width:15%;background:#dc3545;color:white;">Quantity</th>
        <th style="width:65%;background:#dc3545;color:white;">Description</th>
      </tr>
    </thead>
    <tbody>
      ${defectRowsHtml}
    </tbody>
  </table>

  <div class="page-break"></div>

  <h2>QUALITY CRITERIA</h2>
  
  <table style="margin-bottom:15pt;">
    <tr>
      <td class="label">1. Quantity</td>
      <td>${escapeHtml(report.quantityResult || 'OK')}</td>
    </tr>
    <tr>
      <td class="label">2. Product Color & Artwork</td>
      <td>${escapeHtml(report.colorResult || 'OK')}</td>
    </tr>
    <tr>
      <td class="label">3. Product Dimension & Weight</td>
      <td>${escapeHtml(report.dimensionResult || 'OK')} - ${escapeHtml(report.dimensionComment || '')}</td>
    </tr>
    <tr>
      <td class="label">4. Packing/Accessories</td>
      <td>${escapeHtml(report.packingResult || 'OK')} - ${escapeHtml(report.packingComment || '')}</td>
    </tr>
    <tr>
      <td class="label">5. Folding Method</td>
      <td>${escapeHtml(report.foldingResult || 'OK')} - ${escapeHtml(report.foldingComment || '')}</td>
    </tr>
    <tr>
      <td class="label">6. Care Label/Price Tickets/CTN Barcode</td>
      <td>${escapeHtml(report.labelResult || 'OK')} - ${escapeHtml(report.labelComment || '')}</td>
    </tr>
    <tr>
      <td class="label">7. CTN Measurement</td>
      <td>${escapeHtml(report.ctnMeasureResult || 'OK')} - ${escapeHtml(report.ctnMeasureComment || '')}</td>
    </tr>
  </table>
  
  <h2>PACKING QUANTITY</h2>

  <table style="margin-bottom:15pt;">
    <tr>
      <td class="label" style="width:40%;">Quantity of packed products</td>
      <td style="width:60%;">${escapeHtml(report.packingQtyPacked || 'Goods are completely packed')}</td>
    </tr>
    <tr>
      <td class="label">Quantity of finished & unpacked products</td>
      <td>${escapeHtml(report.packingQtyFinished || 'Goods are completely packed')}</td>
    </tr>
    <tr>
      <td class="label">Quantity of semi-finished products</td>
      <td>${escapeHtml(report.packingQtySemi || 'Goods are completely packed')}</td>
    </tr>
  </table>

  ${renderSectionImages('packing-list')}
  
  <div class="page-break"></div>

  <h2>COLOUR/DESIGN LOGO</h2>

  <table style="margin-bottom:15pt;">
    <thead>
      <tr>
        <th style="width:20%;background:#dc3545;color:white;">Color</th>
        <th style="width:20%;background:#dc3545;color:white;">Result</th>
        <th style="width:60%;background:#dc3545;color:white;">Comments</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="font-weight:bold;">WHITE</td>
        <td style="text-align:center;">${escapeHtml(report.colorWhiteResult || 'OK')}</td>
        <td>${escapeHtml(report.colorWhiteComment || 'FABRIC FOLLOW ASPER APPROVED')}</td>
      </tr>
      <tr>
        <td style="font-weight:bold;">BLACK</td>
        <td style="text-align:center;">${escapeHtml(report.colorBlackResult || 'OK')}</td>
        <td>${escapeHtml(report.colorBlackComment || 'FABRIC FOLLOW ASPER APPROVED')}</td>
      </tr>
    </tbody>
  </table>

  ${renderSectionImages('colors')}
  
  <div class="page-break"></div>

  <h2>DIMENSIONS</h2>

  <table style="margin-bottom:15pt;">
    <thead>
      <tr>
        <th style="width:10%;background:#dc3545;color:white;">Size</th>
        <th style="width:20%;background:#dc3545;color:white;">Result</th>
        <th style="width:70%;background:#dc3545;color:white;">Comments</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>S</td>
        <td>${escapeHtml(report.dimSResult || 'Ok')}</td>
        <td>${escapeHtml(report.dimSComment || 'Ok')}</td>
      </tr>
      <tr>
        <td>M</td>
        <td>${escapeHtml(report.dimMResult || 'Ok')}</td>
        <td>${escapeHtml(report.dimMComment || 'Ok')}</td>
      </tr>
      <tr>
        <td>L</td>
        <td>${escapeHtml(report.dimLResult || 'Ok')}</td>
        <td>${escapeHtml(report.dimLComment || 'Ok')}</td>
      </tr>
      <tr>
        <td>2XL</td>
        <td>${escapeHtml(report.dim2XLResult || 'Ok')}</td>
        <td>${escapeHtml(report.dim2XLComment || 'Ok')}</td>
      </tr>
      <tr>
        <td>4XL</td>
        <td>${escapeHtml(report.dim4XLResult || 'Ok')}</td>
        <td>${escapeHtml(report.dim4XLComment || 'Ok')}</td>
      </tr>
    </tbody>
  </table>

  ${renderSectionImages('measurements')}
  
  <div class="page-break"></div>

  <h2>BOYS AND INFANT</h2>

  <table style="margin-bottom:15pt;">
    <thead>
      <tr>
        <th style="width:15%;background:#dc3545;color:white;">Size</th>
        <th style="width:20%;background:#dc3545;color:white;">Result</th>
        <th style="width:65%;background:#dc3545;color:white;">Comments</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>12/13</td>
        <td>${escapeHtml(report.boys12_13Result || 'Ok')}</td>
        <td>${escapeHtml(report.boys12_13Comment || 'Ok')}</td>
      </tr>
      <tr>
        <td>14/15</td>
        <td>${escapeHtml(report.boys14_15Result || 'Ok')}</td>
        <td>${escapeHtml(report.boys14_15Comment || 'Ok')}</td>
      </tr>
      <tr>
        <td>16/17</td>
        <td>${escapeHtml(report.boys16_17Result || 'Ok')}</td>
        <td>${escapeHtml(report.boys16_17Comment || 'Ok')}</td>
      </tr>
      <tr>
        <td>19M</td>
        <td>${escapeHtml(report.boys19MResult || 'Ok')}</td>
        <td>${escapeHtml(report.boys19MComment || 'Ok')}</td>
      </tr>
      <tr>
        <td>23M</td>
        <td>${escapeHtml(report.boys23MResult || 'Ok')}</td>
        <td>${escapeHtml(report.boys23MComment || 'Ok')}</td>
      </tr>
    </tbody>
  </table>

  <h2>CARTON MARKS</h2>

  <table style="margin-bottom:15pt;">
    <tr>
      <td class="label" style="width:30%;">Result</td>
      <td style="width:70%;">${escapeHtml(report.ctnMarksResult || 'OK')}</td>
    </tr>
    <tr>
      <td class="label">Comments</td>
      <td>${escapeHtml(report.ctnMarksComment || 'FACTORY FOLLOWED ALL THE CTN MARKS GIVEN BY BLADE')}</td>
    </tr>
  </table>

  ${renderSectionImages('carton-marks')}
  
  <div class="page-break"></div>

  <h2>FOLDING METHOD</h2>
  ${renderSectionImages('folding')}
  
  <div class="page-break"></div>

  <h2>CARE LABEL / PRICE TICKET / PACKING</h2>
  ${renderSectionImages('care-label')}
  
  <div class="page-break"></div>

  <h2>SHARDING</h2>
  ${renderSectionImages('sharding')}
  
  <div class="page-break"></div>

  <h2>PRICE TICKETS & BARCODE SCAN</h2>
  ${renderSectionImages('price-tickets')}
  
  <div class="page-break"></div>

  <h2>CTN BARCODE SCAN</h2>
  ${renderSectionImages('ctn-barcode')}
  
  <div class="page-break"></div>

  <h2>GSM IMAGES</h2>
  ${renderSectionImages('gsm')}

  <h2>EXPORT CARTON DIMENSIONS</h2>

  <table style="margin-bottom:15pt;">
    <tr>
      <td class="label" style="width:30%;">L cms (W, cms H: cms)</td>
      <td style="width:20%;">${escapeHtml(report.exportCartonResult || 'OK')}</td>
      <td style="width:50%;">${escapeHtml(report.exportCartonComment || 'Refer Packing list on Result 04/12/17')}</td>
    </tr>
  </table>

  ${renderSectionImages('ctn-measurements')}
  
  <div class="page-break"></div>

  <h2>FACTORY PHOTOS</h2>

  <table style="margin-bottom:15pt;">
    <tr>
      <td class="label" style="width:30%;">Maximum weight</td>
      <td style="width:20%;">${escapeHtml(report.maxWeightResult || 'Nil')}</td>
      <td style="width:50%;">${escapeHtml(report.maxWeightComment || 'Ok')}</td>
    </tr>
  </table>

  ${renderSectionImages('factory')}

  ${report.otherRemarks ? `
  <h2>OTHER REMARKS</h2>
  <p>${escapeHtml(report.otherRemarks).replace(/\n/g, '<br>')}</p>
  ` : ''}

  <div class="page-break"></div>

  <div class="important-note">
    <strong>IMPORTANT NOTE</strong><br><br>
    THE ABOVE REPORT IS SENT BY REFLECTIN INDIA QC TEAM'S FINDINGS AT THE TIME AND PLACE OF INSPECTION. 
    THIS REPORT DOES NOT RELEASE THE BUYER OR SELLER FROM CONTRACTUAL RESPONSIBILITIES, NOR DOES IT 
    PRESENT THE BUYERS RIGHT OF CLAIM TOWARDS THE SELLER/SUPPLIER FOR COMPENSATION FOR ANY UNDETECTED 
    APPARENT AND/OR HIDDEN DEFECTS NOT DETECTED DURING INSPECTION OR OCCURRING ANYTIME THEREAFTER.
  </div>

  <hr style="margin-top:30pt;">
  
  <table style="border:none;">
    <tr style="border:none;">
      <td style="border:none;"><strong>Report Generated:</strong></td>
      <td style="border:none;">${new Date().toLocaleString()}</td>
    </tr>
    <tr style="border:none;">
      <td style="border:none;"><strong>Generated By:</strong></td>
      <td style="border:none;">QC Inspection Report PWA v1.0</td>
    </tr>
    <tr style="border:none;">
      <td style="border:none;"><strong>Report ID:</strong></td>
      <td style="border:none;">${currentReportId}</td>
    </tr>
  </table>

</body>
</html>
    `.trim();

    // Create blob with proper Word MIME type
    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword'
    });

    // Create download link
    const filename = `Inspection_Report_${poNumber}_${new Date().toISOString().split('T')[0]}.doc`;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup
    setTimeout(() => URL.revokeObjectURL(url), 100);

    hideLoading();
    showNotification('Word document exported successfully!', 'success');

  } catch (error) {
    hideLoading();
    console.error('Word export error:', error);
    showNotification('Error exporting Word document: ' + error.message, 'error');
  }
}

// Helper function to escape HTML special characters
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Helper function to get defect rows from the table
function getDefectRows() {
  const defectTable = document.querySelector('.defect-table');
  if (!defectTable) return '<tr><td colspan="3">No defects recorded</td></tr>';

  const rows = defectTable.querySelectorAll('tr');
  let html = '';

  // Skip header row (first row with labels)
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].querySelectorAll('td');
    if (cells.length >= 3) {
      const grade = cells[0].querySelector('select, input')?.value || cells[0].textContent.trim();
      const qty = cells[1].querySelector('input')?.value || cells[1].textContent.trim();
      const desc = cells[2].querySelector('input')?.value || cells[2].textContent.trim();

      if (qty && desc && (qty !== '' || desc !== '')) {
        html += `
          <tr>
            <td>${escapeHtml(grade)}</td>
            <td style="text-align:center;">${escapeHtml(qty)}</td>
            <td>${escapeHtml(desc)}</td>
          </tr>
        `;
      }
    }
  }

  return html || '<tr><td colspan="3">No defects recorded</td></tr>';
}

// Note: This exports as .doc (HTML-based) which opens perfectly in Microsoft Word,
// Google Docs, LibreOffice, and all word processors. No external libraries needed!
