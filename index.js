/**
 * 👑 QUEEN BELLA MD V3 - LOADER
 * ✅ NOW WORKS WITH PUBLIC REPO
 * ✅ NO TOKEN NEEDED!
 */

const https = require('https');

// ==========================================
// 🔓 PUBLIC REPO URL (NO TOKEN)
// ==========================================

const BOT_URL = 'https://raw.githubusercontent.com/queenbellabots-cloud/Queen-bella-core/main/bot.js';

// ==========================================
// 📥 DOWNLOAD AND EXECUTE
// ==========================================

function loadBot() {
    console.log('👑 Loading QUEEN BELLA MD V3...');
    console.log('🔓 Accessing public repository...\n');
    
    https.get(BOT_URL, (res) => {
        let data = '';
        
        console.log(`📡 Status: ${res.statusCode}`);
        
        if (res.statusCode === 404) {
            console.log('❌ File not found!');
            console.log('📌 Check: Does bot.js exist in Queen-bella-core?');
            return;
        }
        
        if (res.statusCode !== 200) {
            console.log(`❌ Error: ${res.statusCode}`);
            setTimeout(loadBot, 5000);
            return;
        }
        
        res.on('data', (chunk) => data += chunk);
        
        res.on('end', () => {
            if (data && data.length > 100) {
                console.log('✅ Bot loaded successfully!');
                console.log('🚀 Starting QUEEN BELLA MD V3...\n');
                eval(data);
            } else {
                console.log('❌ Empty response. Retrying...');
                setTimeout(loadBot, 5000);
            }
        });
        
    }).on('error', (err) => {
        console.log('❌ Network error:', err.message);
        setTimeout(loadBot, 5000);
    });
}

// ==========================================
// 🔍 CHECK CONFIG
// ==========================================

function checkConfig() {
    try {
        const config = require('./config.js');
        if (!config.ownerNumber) {
            console.log('⚠️ Please set your ownerNumber in config.js');
            return false;
        }
        console.log('✅ Config loaded successfully!');
        return true;
    } catch (e) {
        console.log('❌ config.js not found!');
        return false;
    }
}

// ==========================================
// 🚀 START
// ==========================================

console.log(`
╔═══════════════════════════════════════╗
║   👑 QUEEN BELLA MD V3               ║
║   Created by Dev RODGERS             ║
║   🔒 Protected Bot                   ║
╚═══════════════════════════════════════╝
`);

if (checkConfig()) {
    loadBot();
} else {
    console.log('📋 Please create config.js and restart.');
}