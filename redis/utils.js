const { redisClient } = require("./index");

const getRedisValueByName = (valueName) => {
    return new Promise((resolve, reject) => {
        return redisClient.get(valueName, (error, value) => {
            resolve(value)
        });
    });
};

module.exports = {
    getRedisValueByName,
};
