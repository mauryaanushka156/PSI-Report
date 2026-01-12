// Camera Module
class CameraHandler {
  constructor() {
    this.stream = null;
    this.currentSection = null;
    this.capturedImage = null;
  }

  async openCamera(section) {
    this.currentSection = section;
    
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });

      // Create camera modal
      const modal = this.createCameraModal();
      document.body.appendChild(modal);

      const video = modal.querySelector('#cameraVideo');
      video.srcObject = this.stream;
      video.play();

    } catch (error) {
      console.error('Camera error:', error);
      alert('Unable to access camera: ' + error.message);
    }
  }

  createCameraModal() {
    const modal = document.createElement('div');
    modal.id = 'cameraModal';
    modal.className = 'camera-modal';
    modal.innerHTML = `
      <div class="camera-container">
        <div class="camera-header">
          <h3>Capture Image - ${this.currentSection}</h3>
          <button class="btn-close-camera" onclick="cameraHandler.closeCamera()">×</button>
        </div>
        <div class="camera-viewport">
          <video id="cameraVideo" autoplay playsinline></video>
          <canvas id="cameraCanvas" style="display:none;"></canvas>
        </div>
        <div class="camera-preview" id="cameraPreview" style="display:none;">
          <img id="previewImage" src="" alt="Preview">
        </div>
        <div class="camera-controls">
          <button class="btn btn-primary" id="btnCapture" onclick="cameraHandler.capturePhoto()">
            📷 Capture
          </button>
          <button class="btn btn-warning" id="btnRetake" onclick="cameraHandler.retake()" style="display:none;">
            🔄 Retake
          </button>
          <button class="btn btn-success" id="btnContinue" onclick="cameraHandler.saveAndContinue()" style="display:none;">
            ✓ Continue
          </button>
          <button class="btn btn-secondary" onclick="cameraHandler.closeCamera()">
            Cancel
          </button>
        </div>
      </div>
    `;
    return modal;
  }

  capturePhoto() {
    const video = document.getElementById('cameraVideo');
    const canvas = document.getElementById('cameraCanvas');
    const context = canvas.getContext('2d');

    // Set canvas size to video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data
    this.capturedImage = canvas.toDataURL('image/jpeg', 0.8);

    // Show preview
    const preview = document.getElementById('cameraPreview');
    const previewImage = document.getElementById('previewImage');
    const videoElement = document.getElementById('cameraVideo');
    
    previewImage.src = this.capturedImage;
    preview.style.display = 'block';
    videoElement.style.display = 'none';

    // Update buttons
    document.getElementById('btnCapture').style.display = 'none';
    document.getElementById('btnRetake').style.display = 'inline-block';
    document.getElementById('btnContinue').style.display = 'inline-block';
  }

  retake() {
    const preview = document.getElementById('cameraPreview');
    const videoElement = document.getElementById('cameraVideo');
    
    preview.style.display = 'none';
    videoElement.style.display = 'block';
    this.capturedImage = null;

    // Update buttons
    document.getElementById('btnCapture').style.display = 'inline-block';
    document.getElementById('btnRetake').style.display = 'none';
    document.getElementById('btnContinue').style.display = 'none';
  }

  async saveAndContinue() {
    if (!this.capturedImage) {
      alert('Please capture an image first');
      return;
    }

    // Save image to IndexedDB
    const imageData = {
      reportId: window.currentReportId,
      section: this.currentSection,
      imageData: this.capturedImage,
      timestamp: new Date().toISOString()
    };

    try {
      const imageId = await inspectionDB.saveImage(imageData);
      
      // Add image to the report section
      this.addImageToSection(this.currentSection, this.capturedImage, imageId);
      
      // Close camera
      this.closeCamera();
      
      // Show success message
      showNotification('Image saved successfully', 'success');
      
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Error saving image: ' + error.message);
    }
  }

  addImageToSection(section, imageData, imageId) {
    const container = document.getElementById(`images-${section}`);
    if (!container) {
      console.error('Image container not found for section:', section);
      return;
    }

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'image-item';
    imageWrapper.dataset.imageId = imageId;
    imageWrapper.innerHTML = `
      <img src="${imageData}" alt="${section} image">
      <button class="btn-remove-image" onclick="removeImage(${imageId}, '${section}')">×</button>
    `;

    container.appendChild(imageWrapper);
  }

  closeCamera() {
    // Stop video stream
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }

    // Remove modal
    const modal = document.getElementById('cameraModal');
    if (modal) {
      modal.remove();
    }

    this.capturedImage = null;
    this.currentSection = null;
  }

  // File input alternative (for desktop) - supports multiple files
  async selectFromFile(section) {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.multiple = true; // Allow multiple file selection
      
      input.onchange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) {
          reject('No files selected');
          return;
        }

        let successCount = 0;
        let errorCount = 0;

        // Process all files
        for (const file of files) {
          try {
            const imageData = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = (event) => resolve(event.target.result);
              reader.onerror = () => reject(new Error('Failed to read file'));
              reader.readAsDataURL(file);
            });
            
            // Save to IndexedDB
            const imgData = {
              reportId: window.currentReportId,
              section: section,
              imageData: imageData,
              timestamp: new Date().toISOString()
            };

            const imageId = await inspectionDB.saveImage(imgData);
            this.addImageToSection(section, imageData, imageId);
            successCount++;
          } catch (error) {
            console.error('Error uploading file:', file.name, error);
            errorCount++;
          }
        }

        if (successCount > 0) {
          showNotification(`Successfully uploaded ${successCount} image(s)${errorCount > 0 ? ` (${errorCount} failed)` : ''}`, 'success');
          resolve(successCount);
        } else {
          showNotification(`Failed to upload images: ${errorCount} error(s)`, 'error');
          reject(new Error('All files failed to upload'));
        }
      };

      input.click();
    });
  }
}

// Export singleton instance
const cameraHandler = new CameraHandler();
