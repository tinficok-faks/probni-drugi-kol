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

const hash_password = async (password, salt = null) => {
    if (!salt) salt = (await randomBytesAsync(16)).toString("hex");
    const hash = (await pbkdf2Async(password, salt, 1000, 64, "sha512")).toString("hex");
    return { hash, salt };
};

const connect_to_db = async () => {
    const url = "mongodb://127.0.0.1:27017";
    const client = new mongodb.MongoClient(url);

    try {
        await client.connect();
        console.log("Successfully connected to MongoDB");
    } catch (e) {
        console.log("Something is wrong");
        console.error(e);
    }

    const db_name = "kolokvij_2";
    return client.db(db_name);
};

(async () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    const db = await connect_to_db();
    const users = db.collection("users");

    // SIGN-UP
    app.post("/api/sign-up", async (req, res) => {
        try {
            const { username, email, password } = req.body ?? {};

            if (!username || !email || !password) {
                return res.status(400).json({ message: "Nedostaju podaci." });
            }

            const existing = await users.findOne({ email });
            if (existing) {
                return res.status(409).json({ message: "Korisnik već postoji." });
            }

            const { hash, salt } = await hash_password(password);

            await users.insertOne({
                username,
                email,
                passwordHash: hash,
                salt,
            });

            const token = await jwtSignAsync(
                { username, email },
                secret,
                { expiresIn: "24h" }
            );

            return res.status(201).json({ token });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Greška na serveru." });
        }
    });

    // SIGN-IN
    app.post("/api/sign-in", async (req, res) => {
        try {
            const { email, password } = req.body ?? {};

            if (!email || !password) {
                return res.status(400).json({ message: "Nedostaju podaci." });
            }

            const user = await users.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "Korisnik ne postoji." });
            }

            const { hash } = await hash_password(password, user.salt);
            if (hash !== user.passwordHash) {
                return res.status(401).json({ message: "Neispravna lozinka." });
            }

            const token = await jwtSignAsync(
                { username: user.username, email: user.email },
                secret,
                { expiresIn: "24h" }
            );

            return res.status(200).json({ token });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Greška na serveru." });
        }
    });

    app.listen(port, () => console.log(`Express.js is listening at port ${port}`));
})();
