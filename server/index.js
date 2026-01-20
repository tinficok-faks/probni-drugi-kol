const express = require("express");
const mongodb = require("mongodb");
const port = 3000;

const util = require("util");
const crypto = require("crypto");

const randomBytesAsync = util.promisify(crypto.randomBytes);
const pbkdf2Async = util.promisify(crypto.pbkdf2);

const jwt = require("jsonwebtoken");
const secret = "ratherStoreInFile";

const jwtSignAsync = util.promisify(jwt.sign);

const hash_password = async (password, salt=null) => {
    if (!salt)
        salt = (await randomBytesAsync(16)).toString("hex");
    
    const hash = (await pbkdf2Async(password, salt, 1000, 64, "sha512")).toString("hex");
    
    return { hash, salt };
}

const connect_to_db = async () => {
    const url = "mongodb://127.0.0.1:27017";
    const client = new mongodb.MongoClient(url);

    try {
        await client.connect();
        console.log("Successfully connected to MongoDB");
    } catch(e) {
        console.log("Something is wrong");
        console.error(e);
    }

    const db_name ="kolokvij_2";
    const db = client.db(db_name);
    return db;
}

(async () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    const db = await connect_to_db();

    app.listen(port, () => console.log(`Express.js is listening at port ${port}`));

})();