require('dotenv').config();
const axios = require('axios');
const { urls, getHeaders } = require('./config');
const { getRandom, slaps, interval } = require('./utils.js');
const { activateBoost, saveCoins, logInfo, exitProcess } = require('./requests');

const env = process.env;


async function main() {
    try {

       await saveCoins(getRandom(1, 5));

        await axios.get(urls.profile, { headers: getHeaders() })
            .then((res) => {
                const { id, energyLeft, isTurboAvailable } = res.data;

                id ? logInfo(res.data) : false;

                !isTurboAvailable ? activateBoost() : false;

                ((energyLeft > 0) && isTurboAvailable) ? saveCoins(slaps(env, true), true) : false;

                function handleCoinCollection() {
                    (id && (energyLeft > 0)) ? saveCoins(slaps(env)) : exitProcess();
                }

                handleCoinCollection();

                setInterval(handleCoinCollection, (interval(env) * 1000));

            })
            .catch(error => {
                console.log(error);
            });
    } catch (error) {
        console.log(error);
    }
}


main();
