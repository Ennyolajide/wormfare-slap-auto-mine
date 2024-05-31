const chalk = require('chalk');
const axios = require('axios');
const { urls, getHeaders } = require('./config');

function buildSlapData(slaps, turbo) {
    return { "startTimestamp": Date.now(), "amount": slaps, "isTurbo": turbo };
}

async function saveCoins(slaps, turbo=false) {
    const data = buildSlapData(slaps, turbo);
    return await axios.post(urls.save_clicks, data, { headers: getHeaders() }).then((res) => {
        const { id, energyLeft } = res.data;
        (id && (energyLeft > 0)) ? logTap(slaps, res.data) : exitProcess();
    }).catch((error) => {
        logError(error);
    });
}

function logInfo(obj) {
    console.log(
        'Name:', chalk.blue(obj?.fullName),
        '| Score:', chalk.yellow(obj?.score),
        '| Energy:', chalk.cyan(obj?.energyLeft),
        '| Energy Boost:', chalk.magenta(obj?.boosts[0]?.level),
        '| Rank:', chalk.green(obj?.rank),
        '| Turbo:', chalk.red(obj?.isTurboAvailable),
        '| Cheat Codes:', chalk.green(obj?.cheatCodes)
    );
}

function logRestoreAttempt(success) {
    console.log(success ? chalk.green('Restored attempt') : chalk.red('Failed to restore attempt'));
}

function logTap(taps, obj) {
    console.log(
        'Taping ...', chalk.blue('->'),
        chalk.cyan(taps), chalk.green('\u2714'),
        '| Score:', chalk.yellow(obj?.score),
        '| Energy Left:', chalk.cyan(obj?.energyLeft),
        '| Rank:', chalk.green(obj?.rank),
    );
}


function logError(error) {
    console.log(error.response ? error.response.data : error.request ? error.request : 'Error', error.message);
}

function exitProcess() {
    console.log(chalk.red('Error collecting coin - Exiting...'));
    process.exit();
}

module.exports = { saveCoins, logInfo, logTap, logError, exitProcess }
