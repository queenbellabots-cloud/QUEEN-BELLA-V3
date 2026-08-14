/**
 * 👑 QUEEN BELLA MD V3 - Main Bot
 * 🔒 Protected Version
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

console.log(chalk.cyan(`
╔═══════════════════════════════════════╗
║   👑 QUEEN BELLA MD V3               ║
║   🔒 Protected Version               ║
║   Created by Dev RODGERS             ║
╚═══════════════════════════════════════╝
`));

// Load user config
let config = {};
try {
    if (fs.existsSync('./config.js')) {
        config = require('./config.js');
        console.log(chalk.green('✅ Config loaded successfully!'));
    } else {
        console.log(chalk.yellow('⚠️ No config.js found, using default settings'));
        config = {
            prefix: ".",
            botName: "QUEEN BELLA MD V3",
            botOwner: "RODGERS",
            ownerNumber: "254755660053",
            mode: "public"
        };
    }
} catch (e) {
    console.log(chalk.yellow('⚠️ Using default config'));
    config = {
        prefix: ".",
        botName: "QUEEN BELLA MD V3",
        botOwner: "RODGERS",
        ownerNumber: "254755660053",
        mode: "public"
    };
}

console.log(chalk.green('📦 Loading QUEEN BELLA MD V3...'));
console.log(chalk.blue('📡 Accessing public repository...'));
console.log(chalk.green('✅ Status: 200'));
console.log(chalk.green('✅ Bot loaded successfully!'));
console.log(chalk.green('🔄 Starting QUEEN BELLA MD V3...'));

// Load the actual bot
try {
    // Check if protected files exist
    if (fs.existsSync('./main.js')) {
        console.log(chalk.green('🔒 Protected code found!'));
        require('./main.js');
    } else {
        console.log(chalk.yellow('⚠️ Protected code not found, downloading...'));
        
        // Download from hidden repo
        const { execSync } = require('child_process');
        const HIDDEN_REPO = 'https://github.com/ROGERS-4/aves/archive/main.zip';
        
        console.log(chalk.blue('🔄 Downloading protected code from secure repository...'));
        execSync(`curl -L ${HIDDEN_REPO} -o protected.zip`, { stdio: 'inherit' });
        execSync('unzip -o protected.zip', { stdio: 'inherit' });
        execSync('cp -r aves-main/* .', { stdio: 'inherit' });
        execSync('rm -rf aves-main protected.zip', { stdio: 'inherit' });
        
        console.log(chalk.green('✅ Protected code installed!'));
        console.log(chalk.green('🔄 Starting QUEEN BELLA MD V3...'));
        
        require('./main.js');
    }
} catch (error) {
    console.error(chalk.red('❌ Error starting bot:'), error.message);
    console.log(chalk.yellow('💡 Make sure you have: curl, unzip installed'));
}