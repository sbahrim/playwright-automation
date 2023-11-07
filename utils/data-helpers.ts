const crypto = require('crypto') //part of free node-js env

export async function getRandomNumber() {
    return Math.floor(Math.random() * 10000 + 1) //generate a random number of 4 digits + 
}

export async function getRandomString() {
    return crypto.randomBytes(20).toString('hex')
}