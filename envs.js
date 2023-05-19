require('dotenv').config();

module.exports = {
    release: process.env.RELEASE,
    prod: process.env.PROD,
    stage: process.env.STAGE
}