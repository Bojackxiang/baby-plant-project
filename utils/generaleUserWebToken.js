const jwt = require('jsonwebtoken');
const { reject } = require('lodash');

const generateUserWebTokenByAccount = (username, password) => {
    return new Promise((resolve) => {
        console.log('开始生成token');
        const token = jwt.sign({username, password}, process.env.JWT)
        console.log(token);
        resolve(token)
        reject("Network error")
    })

}

module.exports = generateUserWebTokenByAccount