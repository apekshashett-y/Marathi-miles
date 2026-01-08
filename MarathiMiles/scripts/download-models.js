// scripts/download-models.js
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES modules mein __dirname ka alternative
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const models = [
  {
    name: 'tiny_face_detector_model',
    files: [
      'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights/tiny_face_detector_model-weights_manifest.json',
      'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights/tiny_face_detector_model-shard1'
    ]
  },
  {
    name: 'face_expression_model', 
    files: [
      'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights/face_expression_model-weights_manifest.json',
      'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights/face_expression_model-shard1'
    ]
  },
  {
    name: 'face_landmark_68_model',
    files: [
      'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights/face_landmark_68_model-weights_manifest.json',
      'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights/face_landmark_68_model-shard1'
    ]
  }
];

const modelsDir = path.join(__dirname, '../public/models');

// Create models directory if it doesn't exist
if (!fs.existsSync(modelsDir)) {
  console.log('📁 Creating models directory...');
  fs.mkdirSync(modelsDir, { recursive: true });
}

console.log('🚀 Starting model download...');
console.log('📂 Downloading to:', modelsDir);

let downloadedCount = 0;
const totalFiles = models.reduce((acc, model) => acc + model.files.length, 0);

function downloadFile(fileUrl, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    
    https.get(fileUrl, response => {
      // Handle redirects
      if (response.statusCode === 302 || response.statusCode === 301) {
        downloadFile(response.headers.location, filePath)
          .then(resolve)
          .catch(reject);
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        downloadedCount++;
        console.log(`✅ (${downloadedCount}/${totalFiles}) Downloaded: ${path.basename(filePath)}`);
        resolve();
      });
      
    }).on('error', err => {
      fs.unlink(filePath, () => {});
      console.error(`❌ Error downloading ${path.basename(filePath)}:`, err.message);
      reject(err);
    });
  });
}

// Download all files
async function downloadAllModels() {
  try {
    for (const model of models) {
      for (const fileUrl of model.files) {
        const fileName = fileUrl.split('/').pop();
        const filePath = path.join(modelsDir, fileName);
        await downloadFile(fileUrl, filePath);
      }
    }
    
    console.log('🎉 All models downloaded successfully!');
    console.log('📁 Models are available at: public/models/');
    
  } catch (error) {
    console.error('💥 Error downloading models:', error);
  }
}

downloadAllModels();