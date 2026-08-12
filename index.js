/**
 * 👑 QUEEN BELLA MD V3 - LOADER
 * Downloads the REAL bot from private repo
 */

const https = require('https');

// 🔒 PRIVATE REPO URL (HIDDEN FROM USERS)
const BOT_URL = 'https://raw.githubusercontent.com/queenbellabots-cloud/QUEEN-BELLA-CORE/main/bot.js';

function loadBot() {
    console.log('👑 Loading QUEEN BELLA MD V3...');
    
    https.get(BOT_URL, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            if (data && data.length > 100) {
                console.log('✅ Bot loaded!');
                eval(data);
            } else {
                console.log('❌ Failed to load. Retrying...');
                setTimeout(loadBot, 5000);
            }
        });
    }).on('error', () => {
        console.log('❌ Error. Retrying in 5 seconds...');
        setTimeout(loadBot, 5000);
    });
}

loadBot();