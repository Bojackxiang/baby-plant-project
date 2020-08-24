const { redisClient } = require("./index");

const getRedisValueByName = (valueName) => {
    return new Promise((resolve, reject) => {
        return redisClient.get(valueName, (error, value) => {
            resolve(value)
        });
    });
};

const saveRedisUserByName = (name, token) => {
    return new Promise((resolve, reject) => {
        return redisClient.set(name, token, () =>{
            resolve('success')
        })
    })
}

module.exports = {
    getRedisValueByName,
    saveRedisUserByName
};
