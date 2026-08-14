/**
 * 🔒 QUEEN BELLA MD V3 - Secure Deployment
 * Downloads protected code from hidden repository
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔒 QUEEN BELLA MD - Protected Deployment');
console.log('📦 Downloading protected code...');

// YOUR HIDDEN REPO URL (Replace with your actual URL)
const HIDDEN_REPO = 'https://github.com/ROGERS-4/aves/archive/main.zip';

try {
    // Check if files already exist
    if (!fs.existsSync('./index.js')) {
        console.log('🔄 Fetching protected code...');
        execSync(`curl -L ${HIDDEN_REPO} -o protected.zip`, { stdio: 'inherit' });
        
        console.log('📂 Extracting...');
        execSync('unzip -o protected.zip', { stdio: 'inherit' });
        
        console.log('📁 Installing protected files...');
        execSync('cp -r aves-main/* .', { stdio: 'inherit' });
        execSync('rm -rf aves-main protected.zip', { stdio: 'inherit' });
        
        console.log('✅ Protected code installed!');
    }
    
    console.log('🚀 Starting QUEEN BELLA MD V3...');
    require('./index.js');
    
} catch (error) {
    console.error('❌ Deployment failed:', error.message);
    console.log('💡 Make sure you have: curl, unzip installed');
    process.exit(1);
}