function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function slaps(env){
    return getRandom(parseInt(env.MIN_TAP), parseInt(env.MAX_TAP));
}

function interval(env) {
    return getRandom(parseInt(env.MIN_INTERVAL), parseInt(env.MAX_INTERVAL));
}


module.exports = { slaps, interval }