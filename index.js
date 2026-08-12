/**
 * 👑 QUEEN BELLA MD V3 - LOADER
 * Downloads the REAL bot from private repo
 */

const https = require('https');

// ==========================================
// 🔒 PRIVATE REPO RAW URL
// ==========================================

// Your fixed raw URL (without the ?token parameter)
const BOT_URL = 'https://raw.githubusercontent.com/queenbellabots-cloud/Queen-bella-core/refs/heads/main/bot.js';

// OPTIONAL: If your repo is private, use a GitHub Personal Access Token
// const GITHUB_TOKEN = 'YOUR_PERSONAL_ACCESS_TOKEN'; // Uncomment and add your token

// ==========================================
// 📥 DOWNLOAD AND EXECUTE
// ==========================================

function loadBot() {
    console.log('👑 Loading QUEEN BELLA MD V3...');
    console.log('🔒 Fetching protected bot code...\n');

    const options = {};

    // If you have a token, add it to the headers
    // if (GITHUB_TOKEN) {
    //     options.headers = {
    //         'Authorization': `token ${GITHUB_TOKEN}`,
    //         'Accept': 'application/vnd.github.v3.raw'
    //     };
    // }

    https.get(BOT_URL, options, (res) => {
        let data = '';

        // Handle redirects
        if (res.statusCode === 301 || res.statusCode === 302) {
            const redirectUrl = res.headers.location;
            console.log('🔄 Redirecting to:', redirectUrl);
            https.get(redirectUrl, (redirectRes) => {
                let redirectData = '';
                redirectRes.on('data', (chunk) => redirectData += chunk);
                redirectRes.on('end', () => {
                    executeBot(redirectData);
                });
            });
            return;
        }

        // Check for successful response
        if (res.statusCode !== 200) {
            console.log(`❌ Failed to fetch bot code. Status: ${res.statusCode}`);
            console.log('📌 Make sure the private repo is public or you\'ve set a valid token.');
            console.log('🔄 Retrying in 10 seconds...');
            setTimeout(loadBot, 10000);
            return;
        }

        res.on('data', (chunk) => data += chunk);

        res.on('end', () => {
            if (data && data.length > 100) {
                executeBot(data);
            } else {
                console.log('❌ Received empty or invalid bot code.');
                console.log('🔄 Retrying in 10 seconds...');
                setTimeout(loadBot, 10000);
            }
        });

    }).on('error', (err) => {
        console.log('❌ Network error:', err.message);
        console.log('🔄 Retrying in 10 seconds...');
        setTimeout(loadBot, 10000);
    });
}

// ==========================================
// 🚀 EXECUTE BOT CODE
// ==========================================

function executeBot(code) {
    console.log('✅ Bot loaded successfully!');
    console.log('🚀 Starting QUEEN BELLA MD V3...\n');

    // Pass config to the bot
    try {
        const config = require('./config.js');
        global.__config = config;
        eval(code);
    } catch (error) {
        console.log('❌ Error executing bot:', error.message);
        console.log('📝 Make sure config.js exists and is valid.');
    }
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
        console.log('❌ config.js not found or invalid!');
        console.log('📝 Create config.js with your WhatsApp number.');
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
    console.log('📋 Please fix config.js and restart.');
}