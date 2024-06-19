function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function slaps(env, turbo=false){
    const _slaps = getRandom(parseInt(env.MIN_TAP), parseInt(env.MAX_TAP));
    return turbo ? (_slaps * parseInt(env.TURBO_MULTIPLIER ?? 1)) : _slaps;
}

function interval(env, turbo=false) {
    return getRandom(parseInt(env.MIN_INTERVAL), parseInt(env.MAX_INTERVAL));
}


module.exports = { getRandom, slaps, interval }