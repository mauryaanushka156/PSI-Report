# Quick Setup Guide

## 🚀 Getting Started in 3 Minutes

### Step 1: Start the Server

Open PowerShell or Command Prompt in this folder and run ONE of these commands:

**Option A - Using Python (Recommended):**
```powershell
python -m http.server 8000
```

**Option B - Using Node.js:**
```powershell
npx http-server -p 8000 -c-1
```

**Option C - Using PHP:**
```powershell
php -S localhost:8000
```

### Step 2: Open in Browser

Open your browser and go to:
```
http://localhost:8000
```

### Step 3: Start Using

1. Click **"+ New Report"** to create your first inspection report
2. Fill in the product information
3. Use **"📷 Add Photo"** to capture images
4. Click **"💾 Save Report"** to save locally
5. Click **"📄 Export PDF"** or **"📝 Export Word"** when done

---

## 📱 Install as Mobile App

### On Android:
1. Open the app in Chrome browser
2. Tap the menu (⋮) in top right
3. Select **"Add to Home Screen"**
4. Tap **"Install"**
5. App appears on your home screen like a native app!

### On iPhone/iPad:
1. Open the app in Safari browser
2. Tap the Share button (square with arrow)
3. Scroll and tap **"Add to Home Screen"**
4. Tap **"Add"**
5. App appears on your home screen!

---

## 📸 Using the Camera

### First Time Setup:
- Browser will ask for camera permission
- Click **"Allow"** to enable camera access
- Permission is saved for future use

### Taking Photos:
1. Click **"📷 Add Photo"** in any section
2. Camera opens automatically
3. Click **"📷 Capture"** to take photo
4. Click **"🔄 Retake"** if you want to try again
5. Click **"✓ Continue"** to save the photo

### Alternative - Upload from Gallery:
- Click **"📁 Upload"** button instead
- Select photo from your device
- Photo is added to the report

---

## 💾 Working Offline

**The app works 100% offline!**

✅ After first load, no internet needed
✅ All data saved on your device
✅ Take photos offline
✅ Create and save reports offline
✅ Export PDF/Word offline (after libraries are cached)

**Important**: 
- First time you export PDF/Word, you need internet to download libraries
- After that, everything works offline

---

## 📊 Managing Reports

### Viewing All Reports:
- Click **"📋 My Reports"** button
- See list of all saved reports
- Shows PO number, client, and date

### Opening a Report:
- Click **"Open"** button on any report
- Report loads with all data and images
- Edit and save changes

### Deleting a Report:
- Click **"Delete"** button
- Confirm deletion
- Report and all images are removed

---

## 📤 Exporting Reports

### PDF Export:
1. Click **"📄 Export PDF"**
2. Wait while PDF generates (may take 10-30 seconds)
3. PDF downloads automatically
4. File name: `Inspection_Report_[PO]_[Date].pdf`

### Word Export:
1. Click **"📝 Export Word"**
2. Wait a few seconds
3. Word document downloads automatically
4. File name: `Inspection_Report_[PO]_[Date].docx`
5. Open in Microsoft Word, Google Docs, or any compatible app

---

## 🔧 Troubleshooting

### Camera Not Working?
- **Check permissions**: Go to browser settings → Site permissions → Camera
- **Try different browser**: Chrome works best on Android, Safari on iOS
- **Use upload instead**: Click "📁 Upload" button as alternative

### Can't Save Report?
- Check if storage is full on your device
- Try clearing browser cache
- Make sure you're not in incognito/private mode

### PWA Won't Install?
- Make sure you're on HTTPS or localhost
- Try reloading the page
- Clear browser cache and try again

### Export Not Working?
- Make sure you saved the report first
- Check internet connection (needed first time only)
- Check browser console for errors (F12)

---

## 📝 Tips & Best Practices

### Before Starting Inspection:
- ✅ Ensure device is charged
- ✅ Clear camera lens
- ✅ Test camera access first
- ✅ Check available storage space

### During Inspection:
- 💾 Save frequently (use auto-save if enabled)
- 📸 Take clear, well-lit photos
- 📝 Fill all required fields
- ✏️ Use consistent naming (PO numbers)

### After Inspection:
- 📄 Export to PDF/Word immediately
- 📧 Email or share the exports
- 💾 Keep a backup of exports
- 🗑️ Delete old reports to free space

---

## 🔒 Data & Privacy

**Your data is 100% private:**
- ✅ All data stored locally on YOUR device only
- ✅ No data sent to any server
- ✅ No tracking or analytics
- ✅ No internet required after first load
- ✅ You control your data completely

**Storage Location:**
- Data stored in browser's IndexedDB
- Photos stored as base64 in database
- Typical capacity: 50MB to 500MB depending on browser

**Backup Recommendations:**
- Export important reports to PDF/Word
- Store exports in cloud storage (Google Drive, Dropbox, etc.)
- Keep copies on multiple devices

---

## 🎯 Quick Reference

| Action | Button/Method |
|--------|---------------|
| New Report | Click "**+ New Report**" |
| Save Report | Click "**💾 Save Report**" |
| View All Reports | Click "**📋 My Reports**" |
| Take Photo | Click "**📷 Add Photo**" |
| Upload Image | Click "**📁 Upload**" |
| Export PDF | Click "**📄 Export PDF**" |
| Export Word | Click "**📝 Export Word**" |
| Delete Image | Click **×** on image |
| Add Defect Row | Click "**+ Add Defect Row**" |

---

## 📞 Need Help?

If you encounter any issues:
1. Check this guide first
2. Check the full README.md for detailed info
3. Check browser console (F12) for error messages
4. Contact your system administrator

---

**Happy Inspecting! 🎉**
