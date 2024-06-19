const chalk = require('chalk');
const axios = require('axios');
const { urls, getHeaders } = require('./config');

const env = process.env;

async function activateBoost() {
    await axios.post(urls.activate_boost, { 'type': 'turbo' }, { headers: getHeaders() }).then((res) => {
        res.data ?  console.log(`Activating Turbo Boost ...`, chalk.green('\u2714')) : false;
    }).catch((error) => {
        console.log(`Activating Turbo Boost ...`, chalk.red('\u2716'))
    });

}

function buildSlapData(slaps, turbo) {
    return { "startTimestamp": (Date.now() - parseInt(env.SERVER_TIME_DIFFERENCE)), "amount": slaps, "isTurbo": turbo };
}

async function saveCoins(slaps, turbo=false) {
    const data = buildSlapData(slaps, turbo);
    return await axios.post(urls.save_clicks, data, { headers: getHeaders() }).then((res) => {
        const { id, energyLeft } = res.data;
        id ? logTap(slaps, res.data) : false;
        (id && (energyLeft <= 0)) ? exitProcess() : false;
    }).catch((error) => {
        logError(error);
    });
}

function logInfo(obj) {
    console.log(
        'Name:', chalk.blue(obj?.fullName),
        '| Score:', chalk.yellow(obj?.score),
        '| Energy:', chalk.cyan(obj?.energyLeft),
        '| Max Energy:', chalk.magenta(obj?.energyMax),
        '| Energy Per second:', chalk.red(obj?.energyPerSecond),
        '| Rank:', chalk.green(obj?.rank),
        '| Cheat Codes:', chalk.green(obj?.cheatCodes)
    );
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
    process.exit();
}

function exitProcess() {
    console.log(chalk.red('Error collecting coin - Exiting...'));
    process.exit();
}

module.exports = { activateBoost, saveCoins, logInfo, logTap, logError, exitProcess }
