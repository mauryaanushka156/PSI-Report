// PDF Export Module using jsPDF and html2canvas

async function exportToPDF() {
  if (!currentReportId) {
    if (!confirm('Report not saved. Save before exporting?')) {
      return;
    }
    await saveReport();
    if (!currentReportId) {
      showNotification('Please save the report first', 'error');
      return;
    }
  }

  try {
    showLoading('Preparing PDF export...');

    // Function to check if an element has meaningful content
    const hasRealContent = (element) => {
      // Skip if element is hidden
      if (element.style.display === 'none') {
        return false;
      }

      // Section titles alone don't count as content - need actual data
      // (We'll check for titles + other content together)
      
      // Check for tables with rows
      if (element.tagName === 'TABLE') {
        const rows = element.querySelectorAll('tbody tr, tr');
        if (rows.length > 0) {
          // Check if table has any non-empty cells
          for (const row of rows) {
            const cells = row.querySelectorAll('td, th');
            for (const cell of cells) {
              const inputs = cell.querySelectorAll('input, textarea, select');
              if (inputs.length > 0) {
                // Has form elements - consider as content
                return true;
              }
              // Check for text content (excluding whitespace)
              if (cell.textContent && cell.textContent.trim().length > 0) {
                return true;
              }
            }
          }
        }
      }
      
      // Check for image grids with actual images
      if (element.classList && (
          element.classList.contains('image-grid') || 
          element.classList.contains('image-grid-2col') ||
          element.classList.contains('image-grid-4col') ||
          element.classList.contains('image-grid-large'))) {
        if (element.querySelectorAll('img').length > 0) {
          return true;
        }
      }
      
      // Check for decision buttons
      if (element.classList && (
          element.classList.contains('decision-buttons') || 
          element.classList.contains('overall-result'))) {
        return true;
      }
      
      // Check for content-grid
      if (element.classList && element.classList.contains('content-grid')) {
        return true;
      }
      
      // Check for textareas with content
      if (element.tagName === 'TEXTAREA') {
        if (element.value && element.value.trim().length > 0) {
          return true;
        }
      }
      
      // Check for inputs/selects with values
      if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
        const value = element.value || element.getAttribute('value') || '';
        if (value.trim().length > 0 && element.id !== 'poNumber') {
          return true;
        }
      }
      
      // Recursively check all child elements
      if (element.children && element.children.length > 0) {
        for (const child of element.children) {
          // Skip page-header and page-footer
          if (child.classList && (
              child.classList.contains('page-header') || 
              child.classList.contains('page-footer'))) {
            continue;
          }
          if (hasRealContent(child)) {
            return true;
          }
        }
      }
      
      return false;
    };

    // Hide empty pages before printing
    const reportPages = document.querySelectorAll('.report-page');
    let hiddenCount = 0;
    
    reportPages.forEach(page => {
      // Check if page has real content (beyond just header/footer)
      const hasContent = hasRealContent(page);
      
      if (!hasContent) {
        // Page is essentially empty - hide it completely
        page.style.display = 'none';
        page.style.pageBreakAfter = 'avoid';
        page.style.breakAfter = 'avoid';
        hiddenCount++;
      } else {
        // Page has content - make sure it's visible
        page.style.display = 'block';
        // Remove forced page breaks for non-first pages
        if (page !== reportPages[0]) {
          page.style.pageBreakBefore = 'auto';
          page.style.breakBefore = 'auto';
        }
      }
    });

    console.log(`PDF Export: Hidden ${hiddenCount} empty pages, showing ${reportPages.length - hiddenCount} pages with content`);

    // Hide UI elements
    const uiElements = document.querySelectorAll('.app-header, .action-bar, button:not(.btn-approve):not(.btn-reject)');
    uiElements.forEach(el => {
      if (el) el.style.display = 'none';
    });

    // Small delay to ensure styles are applied
    await new Promise(resolve => setTimeout(resolve, 200));

    // Use native browser print for best quality (Vector PDF)
    window.print();

    // Restore UI elements and pages after print dialog
    setTimeout(() => {
      uiElements.forEach(el => {
        if (el) el.style.display = '';
      });
      reportPages.forEach(page => {
        page.style.display = 'block';
        page.style.pageBreakBefore = '';
        page.style.breakBefore = '';
        page.style.pageBreakAfter = '';
        page.style.breakAfter = '';
      });
      hideLoading();
    }, 1500);

  } catch (error) {
    hideLoading();
    console.error('PDF export error:', error);
    showNotification('Error exporting PDF: ' + error.message, 'error');
  }
}

// Load PDF libraries dynamically
async function loadPDFLibraries() {
  // Check if libraries are already loaded
  if (window.jspdf && window.html2canvas) {
    return;
  }

  return new Promise((resolve, reject) => {
    // Load html2canvas
    const html2canvasScript = document.createElement('script');
    html2canvasScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    html2canvasScript.onload = () => {
      // Load jsPDF
      const jspdfScript = document.createElement('script');
      jspdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      jspdfScript.onload = () => resolve();
      jspdfScript.onerror = () => reject(new Error('Failed to load jsPDF'));
      document.head.appendChild(jspdfScript);
    };
    html2canvasScript.onerror = () => reject(new Error('Failed to load html2canvas'));
    document.head.appendChild(html2canvasScript);
  });
}

// Alternative: Simple PDF export using browser print
async function exportToPDFPrint() {
  if (!currentReportId && !confirm('Report not saved. Continue anyway?')) {
    return;
  }

  // Hide UI elements
  const uiElements = document.querySelectorAll('.app-header, .action-bar, button');
  uiElements.forEach(el => el.style.display = 'none');

  // Trigger print dialog
  window.print();

  // Restore UI elements
  setTimeout(() => {
    uiElements.forEach(el => el.style.display = '');
  }, 1000);
}
