/**
 * 👑 QUEEN BELLA MD V3 - LOADER
 * Downloads the REAL bot from PRIVATE repo
 */

const https = require('https');

// ==========================================
// 🔒 PRIVATE REPO URL
// ==========================================

const BOT_URL = 'https://api.github.com/repos/queenbellabots-cloud/Queen-bella-core/contents/bot.js';

// ✅ YOUR NEW GITHUB TOKEN
const GITHUB_TOKEN = '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';

// ==========================================
// 📥 DOWNLOAD FROM PRIVATE REPO
// ==========================================

function loadBot() {
    console.log('👑 Loading QUEEN BELLA MD V3...');
    console.log('🔒 Accessing private repository...\n');
    
    const options = {
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3.raw',
            'User-Agent': 'QUEEN-BELLA-MD-V3'
        }
    };
    
    https.get(BOT_URL, options, (res) => {
        let data = '';
        
        console.log(`📡 Status: ${res.statusCode}`);
        
        if (res.statusCode === 401 || res.statusCode === 403) {
            console.log('❌ Authentication failed!');
            console.log('📌 Make sure you checked the "repo" box when creating the token');
            console.log('📌 Token must start with ghp_');
            return;
        }
        
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
