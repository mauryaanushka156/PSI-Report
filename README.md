# QC Inspection Report PWA

A Progressive Web App for quality control inspection reports with offline capability, camera integration, and PDF/Word export functionality.

## Features

✅ **Fixed Report Structure** - HTML templates locked, inspector cannot break structure
✅ **Camera Support** - Direct camera capture with retake/continue options
✅ **Offline-First** - Works without internet, syncs when online
✅ **No App Store** - Install directly via "Add to Home Screen"
✅ **PDF Export** - Generate inspection reports as PDF
✅ **Word Export** - Generate inspection reports as Word documents
✅ **Multiple Images** - Add unlimited images per section with automatic pagination
✅ **Local Storage** - All data stored locally using IndexedDB
✅ **Responsive Design** - Works on mobile, tablet, and desktop

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **PWA**: Service Worker, Web App Manifest
- **Storage**: IndexedDB for offline data persistence
- **Camera**: MediaDevices API
- **PDF Generation**: jsPDF + html2canvas
- **Word Generation**: docx.js
- **No Backend Required** - Fully client-side application

## Installation

### Option 1: Local Development

1. Clone or download this repository
2. Serve the files using any HTTP server:
   
   **Using Python:**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   **Using Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```
   
   **Using PHP:**
   ```bash
   php -S localhost:8000
   ```

3. Open browser and navigate to `http://localhost:8000`

### Option 2: Deploy to Web Server

1. Upload all files to your web server
2. Ensure HTTPS is enabled (required for PWA features)
3. Access via your domain

### Option 3: Add to Home Screen (Mobile)

**Android Chrome:**
1. Open the app in Chrome
2. Tap the menu (⋮) → "Add to Home Screen"
3. App will install like a native app

**iOS Safari:**
1. Open the app in Safari
2. Tap Share button → "Add to Home Screen"
3. App will install on your home screen

## Usage

### Creating a New Report

1. Click **"+ New Report"** button
2. Fill in the product description fields
3. Add images using camera or file upload
4. Complete inspection standards
5. Record inspection results and defects
6. Add measurements and photos
7. Click **"💾 Save Report"** to save locally

### Using the Camera

1. Click **"📷 Add Photo"** in any section
2. Allow camera permissions if prompted
3. Click **"📷 Capture"** to take photo
4. Click **"🔄 Retake"** to take another photo
5. Click **"✓ Continue"** to save and add to report

### Managing Reports

- **View All Reports**: Click "📋 My Reports" to see saved reports
- **Open Report**: Click "Open" on any saved report
- **Delete Report**: Click "Delete" to remove a report
- **Edit Report**: Open a report and modify any fields

### Exporting Reports

**PDF Export:**
- Click **"📄 Export PDF"** to generate a PDF file
- All pages and images will be included
- PDF downloads automatically

**Word Export:**
- Click **"📝 Export Word"** to generate a .docx file
- Structured document with all data
- Opens in Microsoft Word or compatible apps

## File Structure

```
qc-inspection-pwa/
├── index.html              # Main application HTML
├── manifest.json           # PWA manifest
├── service-worker.js       # Service worker for offline support
├── styles.css              # Application styles
├── app.js                  # Main application logic
├── db.js                   # IndexedDB database manager
├── camera.js               # Camera handling
├── pdf-export.js           # PDF export functionality
├── word-export.js          # Word export functionality
├── icon-192.png            # App icon (192x192)
├── icon-512.png            # App icon (512x512)
└── README.md               # This file
```

## Browser Compatibility

- ✅ Chrome/Edge (Android/Desktop) - Full support
- ✅ Safari (iOS) - Full support
- ✅ Firefox (Android/Desktop) - Full support
- ⚠️ Older browsers may have limited PWA features

## Offline Capabilities

The app works fully offline:
- ✅ View and create reports
- ✅ Take photos with camera
- ✅ Save reports to local storage
- ✅ Export to PDF/Word
- ✅ All data persists locally

## Data Storage

- **Storage Method**: IndexedDB (browser database)
- **Data Location**: Local device only
- **Capacity**: Typically 50MB+ depending on browser
- **Backup**: Export reports to PDF/Word for backup

## Security & Privacy

- ✅ All data stored locally on device
- ✅ No data sent to external servers
- ✅ No user tracking or analytics
- ✅ Camera access only when needed
- ✅ Works without internet connection

## Customization

### Modifying Report Structure

The report structure is in `index.html`. Each section is wrapped in a `<div class="report-page">`:

```html
<div class="report-page">
  <!-- Page content here -->
</div>
```

**Important**: The structure is fixed by design. Modify carefully to maintain consistency.

### Adding New Sections

1. Add a new section in `index.html`
2. Add image container: `<div id="images-your-section">`
3. Add camera button: `onclick="cameraHandler.openCamera('your-section')"`

### Styling Changes

Modify `styles.css` to change:
- Colors (search for `#dc3545` for red theme)
- Fonts (change `font-family`)
- Layout (modify grid and flexbox properties)

## Troubleshooting

### Camera Not Working

- **Desktop**: Ensure you have a webcam connected
- **Mobile**: Grant camera permissions in browser settings
- **All**: Use "📁 Upload" button as alternative

### PWA Not Installing

- Ensure you're using HTTPS (or localhost for testing)
- Check that `manifest.json` is accessible
- Service worker must register successfully

### Data Not Saving

- Check browser console for errors
- Ensure IndexedDB is not disabled
- Try clearing browser cache and reloading

### Export Not Working

- PDF/Word libraries load from CDN (needs internet first time)
- Check browser console for errors
- Try using browser print as alternative

## Development

### Adding New Features

1. **New Form Fields**: Add to `index.html` and update `saveReport()` in `app.js`
2. **New Image Sections**: Add container div and camera button
3. **New Export Formats**: Create new export module (e.g., `excel-export.js`)

### Testing

1. Test on multiple devices (mobile, tablet, desktop)
2. Test offline mode (disable network in DevTools)
3. Test camera on real devices (not just emulator)
4. Test with large numbers of images

## Known Limitations

- Large numbers of images (100+) may slow down export
- PDF export quality depends on screen resolution
- Some older browsers may not support all PWA features
- Camera API requires HTTPS in production

## Future Enhancements

- [ ] Cloud sync option (optional)
- [ ] Email report functionality
- [ ] QR code generation
- [ ] Multi-language support
- [ ] Digital signatures
- [ ] Report templates

## License

This is a custom application for internal use. All rights reserved.

## Support

For issues or questions, contact your system administrator.

## Version History

- **v1.0.0** (2026-01) - Initial release
  - Fixed report structure
  - Camera integration
  - Offline support
  - PDF/Word export
  - IndexedDB storage

---

**Built with ❤️ for Quality Control Teams**
