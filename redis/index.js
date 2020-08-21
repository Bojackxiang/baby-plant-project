const redis = require('redis');

const client = redis.createClient();

const redisConnectionTest = async () => {
    client.on('connect', (error) => {
        if(error) {
            console.log('fail to connect the redis ❌');
            console.log(error);
            return;
        }
        console.log('redis connected! ✅');
    })  
}

module.exports = {
    redisConnectionTest, 
    redisClient: client, 
}