require('dotenv').config();
const axios = require('axios');
const { urls, getHeaders } = require('./config');
const { slaps, interval } = require('./utils.js');
const { saveCoins, logInfo, exitProcess } = require('./requests');

const env = process.env;


axios.get(urls.profile, { headers: getHeaders() })
    .then((res) => {
        const { id, energyLeft } = res.data;
        id ? logInfo(res.data) : false;

        // Function to execute
        function handleCoinCollection() {
            (id && (energyLeft > 0)) ? saveCoins(slaps(env), false) : exitProcess();
        }

        handleCoinCollection();

        setInterval(handleCoinCollection, interval(env) * 1000);
    })
    .catch(error => {
        console.log(error);
    });