// Main Application Logic

let currentReportId = null;
window.currentReportId = null;

// Initialize App
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await inspectionDB.init();
    console.log('Database initialized');
    
    // Check if we have a current report in sessionStorage
    const savedReportId = sessionStorage.getItem('currentReportId');
    if (savedReportId) {
      currentReportId = parseInt(savedReportId);
      window.currentReportId = currentReportId;
      await loadReport(currentReportId);
    }
    
    showNotification('App ready - Offline mode enabled', 'success');
  } catch (error) {
    console.error('Initialization error:', error);
    showNotification('Error initializing app: ' + error.message, 'error');
  }
});

// Create New Report
function createNewReport() {
  if (confirm('Create a new inspection report? Any unsaved changes will be lost.')) {
    // Clear current report
    currentReportId = null;
    window.currentReportId = null;
    sessionStorage.removeItem('currentReportId');
    
    // Reset all form fields
    document.getElementById('inspectionReport').querySelectorAll('input, textarea, select').forEach(field => {
      if (field.type === 'checkbox') {
        field.checked = false;
      } else if (field.type === 'date') {
        field.value = new Date().toISOString().split('T')[0];
      } else {
        field.value = '';
      }
    });
    
    // Clear all images
    document.querySelectorAll('[id^="images-"]').forEach(container => {
      container.innerHTML = '';
    });
    
    // Set default date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('inspectionDate').value = today;
    
    // Show report view
    document.getElementById('reportsListView').style.display = 'none';
    document.getElementById('reportView').style.display = 'block';
    
    showNotification('New report created', 'success');
  }
}

// Save Report
async function saveReport() {
  try {
    showLoading('Saving report...');
    
    // Collect all form data
    const reportData = {
      // Product Description
      poNumber: document.getElementById('poNumber').value,
      client: document.getElementById('client').value,
      productName: document.getElementById('productName').value,
      importer: document.getElementById('importer').value,
      location: document.getElementById('location').value,
      instruction: document.getElementById('instruction').value,
      styleNo: document.getElementById('styleNo').value,
      inspectionDate: document.getElementById('inspectionDate').value,
      poNumberDetail: document.getElementById('poNumberDetail').value,
      cartonsInspected: document.getElementById('cartonsInspected').value,
      orderQuantity: document.getElementById('orderQuantity').value,
      quantityInspection: document.getElementById('quantityInspection').value,
      inspection: document.getElementById('inspection').value,
      
      // Inspection Standards
      inspectionType: document.getElementById('inspectionType').value,
      samplingStandard: document.getElementById('samplingStandard').value,
      samplingLevel: document.getElementById('samplingLevel').value,
      aqlCritical: document.getElementById('aqlCritical').value,
      criticalChecked: document.getElementById('criticalChecked').value,
      aqlMajor: document.getElementById('aqlMajor').value,
      majorChecked: document.getElementById('majorChecked').value,
      aqlMinor: document.getElementById('aqlMinor').value,
      minorChecked: document.getElementById('minorChecked').value,
      samplingPlan: document.getElementById('samplingPlan').value,
      priorQuantity: document.getElementById('priorQuantity').value,
      quantityCartons: document.getElementById('quantityCartons').value,
      cartonsInspectedCount: document.getElementById('cartonsInspectedCount').value,
      
      // Results
      overallResult: document.getElementById('overallResult').value,
      workmanshipCritical: document.getElementById('workmanshipCritical').value,
      workmanshipMajor: document.getElementById('workmanshipMajor').value,
      workmanshipMinor: document.getElementById('workmanshipMinor').value,
      overAqlCritical: document.getElementById('overAqlCritical')?.value,
      overAqlMajor: document.getElementById('overAqlMajor')?.value,
      overAqlMinor: document.getElementById('overAqlMinor')?.value,
      checkedCritical: document.getElementById('checkedCritical')?.value,
      checkedMajor: document.getElementById('checkedMajor')?.value,
      checkedMinor: document.getElementById('checkedMinor')?.value,
      
      // Quality Criteria
      quantityResult: document.getElementById('quantityResult')?.value,
      colorResult: document.getElementById('colorResult')?.value,
      dimensionResult: document.getElementById('dimensionResult')?.value,
      dimensionComment: document.getElementById('dimensionComment')?.value,
      packingResult: document.getElementById('packingResult')?.value,
      packingComment: document.getElementById('packingComment')?.value,
      foldingResult: document.getElementById('foldingResult')?.value,
      foldingComment: document.getElementById('foldingComment')?.value,
      labelResult: document.getElementById('labelResult')?.value,
      labelComment: document.getElementById('labelComment')?.value,
      ctnMeasureResult: document.getElementById('ctnMeasureResult')?.value,
      ctnMeasureComment: document.getElementById('ctnMeasureComment')?.value,
      
      // Page 4: Packing
      packingQtyPacked: document.getElementById('packingQtyPacked')?.value,
      packingQtyFinished: document.getElementById('packingQtyFinished')?.value,
      packingQtySemi: document.getElementById('packingQtySemi')?.value,

      // Page 5: Color
      colorWhiteResult: document.getElementById('colorWhiteResult')?.value,
      colorWhiteComment: document.getElementById('colorWhiteComment')?.value,
      colorBlackResult: document.getElementById('colorBlackResult')?.value,
      colorBlackComment: document.getElementById('colorBlackComment')?.value,

      // Page 5: Dimensions
      dimSResult: document.getElementById('dimSResult')?.value,
      dimSComment: document.getElementById('dimSComment')?.value,
      dimMResult: document.getElementById('dimMResult')?.value,
      dimMComment: document.getElementById('dimMComment')?.value,
      dimLResult: document.getElementById('dimLResult')?.value,
      dimLComment: document.getElementById('dimLComment')?.value,
      dim2XLResult: document.getElementById('dim2XLResult')?.value,
      dim2XLComment: document.getElementById('dim2XLComment')?.value,
      dim4XLResult: document.getElementById('dim4XLResult')?.value,
      dim4XLComment: document.getElementById('dim4XLComment')?.value,

      // Page 9: Boys/Infant
      boys12_13Result: document.getElementById('boys12_13Result')?.value,
      boys12_13Comment: document.getElementById('boys12_13Comment')?.value,
      boys14_15Result: document.getElementById('boys14_15Result')?.value,
      boys14_15Comment: document.getElementById('boys14_15Comment')?.value,
      boys16_17Result: document.getElementById('boys16_17Result')?.value,
      boys16_17Comment: document.getElementById('boys16_17Comment')?.value,
      boys19MResult: document.getElementById('boys19MResult')?.value,
      boys19MComment: document.getElementById('boys19MComment')?.value,
      boys23MResult: document.getElementById('boys23MResult')?.value,
      boys23MComment: document.getElementById('boys23MComment')?.value,

      // Page 10: Carton Marks
      ctnMarksResult: document.getElementById('ctnMarksResult')?.value,
      ctnMarksComment: document.getElementById('ctnMarksComment')?.value,

      // Page 16: Export Carton
      exportCartonResult: document.getElementById('exportCartonResult')?.value,
      exportCartonComment: document.getElementById('exportCartonComment')?.value,

      // Page 18: Factory Weight
      maxWeightResult: document.getElementById('maxWeightResult')?.value,
      maxWeightComment: document.getElementById('maxWeightComment')?.value,
      
      // Other fields
      otherRemarks: document.getElementById('otherRemarks').value
    };
    
    // Save or update report
    let reportId;
    if (currentReportId) {
      reportId = currentReportId;
      await inspectionDB.updateReport(currentReportId, reportData);
      showNotification('Report updated successfully', 'success');
    } else {
      reportId = await inspectionDB.saveReport(reportData);
      currentReportId = reportId;
      window.currentReportId = reportId;
      sessionStorage.setItem('currentReportId', reportId);
      showNotification('Report saved successfully', 'success');
    }
    
    // Save all images from DOM to ensure they're associated with this report
    const sectionNames = [
      'product-main', 'packing-list', 'colors', 'measurements',
      'carton-marks', 'folding', 'care-label', 'sharding',
      'price-tickets', 'ctn-barcode', 'gsm', 'ctn-measurements', 'factory'
    ];
    
    for (const sectionName of sectionNames) {
      const container = document.getElementById(`images-${sectionName}`);
      if (container) {
        const imageItems = container.querySelectorAll('.image-item');
        for (const imageWrapper of imageItems) {
          const img = imageWrapper.querySelector('img');
          if (!img) continue;
          
          const imageId = imageWrapper.dataset.imageId ? parseInt(imageWrapper.dataset.imageId) : null;
          const imageSrc = img.src;
          
          try {
            if (imageId) {
              // Update existing image's reportId if it changed
              const existingImage = await inspectionDB.getImage(imageId);
              if (existingImage && existingImage.reportId !== reportId) {
                existingImage.reportId = reportId;
                await inspectionDB.updateImage(imageId, existingImage);
              }
            } else {
              // Save new image
              const imageData = {
                reportId: reportId,
                section: sectionName,
                imageData: imageSrc,
                timestamp: new Date().toISOString()
              };
              const newImageId = await inspectionDB.saveImage(imageData);
              imageWrapper.dataset.imageId = newImageId;
              // Update remove button onclick
              const removeBtn = imageWrapper.querySelector('.btn-remove-image');
              if (removeBtn) {
                removeBtn.setAttribute('onclick', `removeImage(${newImageId}, '${sectionName}')`);
              }
            }
          } catch (e) {
            console.error('Error saving image for section', sectionName, e);
          }
        }
      }
    }
    
    hideLoading();
  } catch (error) {
    hideLoading();
    console.error('Save error:', error);
    showNotification('Error saving report: ' + error.message, 'error');
  }
}

// Load Report
async function loadReport(reportId) {
  try {
    showLoading('Loading report...');
    
    const report = await inspectionDB.getReport(reportId);
    if (!report) {
      showNotification('Report not found', 'error');
      hideLoading();
      return;
    }
    
    // Populate form fields
    Object.keys(report).forEach(key => {
      const element = document.getElementById(key);
      if (element) {
        element.value = report[key] || '';
      }
    });
    
    // Load images for all sections
    const sections = [
      'product-main', 'packing-list', 'colors', 'measurements',
      'carton-marks', 'folding', 'care-label', 'sharding',
      'price-tickets', 'ctn-barcode', 'gsm', 'ctn-measurements', 'factory'
    ];
    
    for (const section of sections) {
      const images = await inspectionDB.getImagesBySection(reportId, section);
      const container = document.getElementById(`images-${section}`);
      if (container) {
        container.innerHTML = '';
        images.forEach(img => {
          cameraHandler.addImageToSection(section, img.imageData, img.id);
        });
      }
    }
    
    currentReportId = reportId;
    window.currentReportId = reportId;
    sessionStorage.setItem('currentReportId', reportId);
    
    // Show report view
    document.getElementById('reportsListView').style.display = 'none';
    document.getElementById('reportView').style.display = 'block';
    
    hideLoading();
    showNotification('Report loaded successfully', 'success');
  } catch (error) {
    hideLoading();
    console.error('Load error:', error);
    showNotification('Error loading report: ' + error.message, 'error');
  }
}

// Show Reports List
async function showReportsList() {
  try {
    showLoading('Loading reports...');
    
    const reports = await inspectionDB.getAllReports();
    const listContainer = document.getElementById('reportsList');
    
    if (reports.length === 0) {
      listContainer.innerHTML = '<p style="text-align:center;color:#666;padding:40px;">No saved reports yet. Create your first report!</p>';
    } else {
      listContainer.innerHTML = reports.map(report => `
        <div class="report-card">
          <div class="report-info">
            <h3>PO# ${report.poNumber || 'Untitled'}</h3>
            <div class="report-meta">
              <div>Client: ${report.client || 'N/A'}</div>
              <div>Date: ${report.inspectionDate || 'N/A'}</div>
              <div>Saved: ${new Date(report.timestamp).toLocaleString()}</div>
            </div>
          </div>
          <div class="report-actions">
            <button class="btn btn-primary" onclick="loadReport(${report.id})">Open</button>
            <button class="btn btn-danger" onclick="deleteReport(${report.id})">Delete</button>
          </div>
        </div>
      `).join('');
    }
    
    document.getElementById('reportView').style.display = 'none';
    document.getElementById('reportsListView').style.display = 'block';
    
    hideLoading();
  } catch (error) {
    hideLoading();
    console.error('Error loading reports list:', error);
    showNotification('Error loading reports: ' + error.message, 'error');
  }
}

// Hide Reports List
function hideReportsList() {
  document.getElementById('reportsListView').style.display = 'none';
  document.getElementById('reportView').style.display = 'block';
}

// Delete Report
async function deleteReport(reportId) {
  if (confirm('Are you sure you want to delete this report? This cannot be undone.')) {
    try {
      await inspectionDB.deleteReport(reportId);
      
      // Delete associated images
      const images = await inspectionDB.getImagesByReport(reportId);
      for (const img of images) {
        await inspectionDB.deleteImage(img.id);
      }
      
      if (currentReportId === reportId) {
        currentReportId = null;
        window.currentReportId = null;
        sessionStorage.removeItem('currentReportId');
      }
      
      showNotification('Report deleted successfully', 'success');
      showReportsList();
    } catch (error) {
      console.error('Delete error:', error);
      showNotification('Error deleting report: ' + error.message, 'error');
    }
  }
}

// Remove Image
async function removeImage(imageId, section) {
  if (confirm('Remove this image?')) {
    try {
      await inspectionDB.deleteImage(imageId);
      const imageElement = document.querySelector(`[data-image-id="${imageId}"]`);
      if (imageElement) {
        imageElement.remove();
      }
      showNotification('Image removed', 'success');
    } catch (error) {
      console.error('Error removing image:', error);
      showNotification('Error removing image: ' + error.message, 'error');
    }
  }
}

// Add Defect Row
function addDefectRow() {
  const table = document.querySelector('.defect-table');
  const newRow = table.insertRow(table.rows.length);
  
  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);
  
  cell1.innerHTML = '<select><option>MAJOR</option><option>MINOR</option><option>CRITICAL</option></select>';
  cell2.innerHTML = '<input type="number" min="0">';
  cell3.innerHTML = '<input type="text" placeholder="Enter defect description">';
  
  showNotification('New defect row added', 'info');
}

// Final Approve
function finalApprove() {
  document.getElementById('overallResult').value = 'Approve';
  showNotification('Report marked as APPROVED', 'success');
}

// Final Reject
function finalReject() {
  document.getElementById('overallResult').value = 'Reject';
  showNotification('Report marked as REJECTED', 'error');
}

// Show Notification
function showNotification(message, type = 'info') {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.style.display = 'block';
  
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

// Show Loading
function showLoading(message = 'Processing...') {
  const overlay = document.getElementById('loadingOverlay');
  const text = overlay.querySelector('.loading-text');
  text.textContent = message;
  overlay.style.display = 'flex';
}

// Hide Loading
function hideLoading() {
  document.getElementById('loadingOverlay').style.display = 'none';
}

// Auto-save functionality (optional)
let autoSaveInterval;
function enableAutoSave(intervalMinutes = 5) {
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval);
  }
  
  autoSaveInterval = setInterval(() => {
    if (currentReportId) {
      saveReport();
      console.log('Auto-saved at', new Date().toLocaleTimeString());
    }
  }, intervalMinutes * 60 * 1000);
}

// Enable auto-save every 5 minutes
// Uncomment the line below to enable auto-save
// enableAutoSave(5);
