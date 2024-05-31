require('dotenv').config();

const env = process.env;
const baseUrl = 'https://elcevb3oz4.execute-api.eu-central-1.amazonaws.com';

const urls = {
    profile: `${baseUrl}/user/profile`,
    buy_boost: `${baseUrl}/game/buy-boost`,
    save_clicks: `${baseUrl}/game/save-clicks`,
}

function setToken() {
    return `Bearer ${env.BEARER_TOKEN}`;
}

function getHeaders(headers = {}) {

    return {
        'Authorization': setToken(),
        'Sec-Fetch-Site': 'cross-site',
        'Accept-Language': 'en-GB,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'X-Api-Key': `${env.API_KEY}`,
        'Sec-Fetch-Mode': 'cors',
        'Origin': 'https://clicker.wormfare.com',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
        'Referer': 'https://clicker.wormfare.com/',
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/plain, */*',
        'Sec-Fetch-Dest': 'empty'
    };

}

module.exports = { urls, getHeaders }
