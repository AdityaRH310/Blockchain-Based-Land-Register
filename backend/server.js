const express = require('express');
const cors = require('cors');
const connect = require('./connect');

const app = express();

app.use(express.json());
app.use(cors());


// 🔐 SIGNUP
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        const { gateway, contract } = await connect();

        await contract.submitTransaction(
            'RegisterUser',
            username,
            password
        );

        await gateway.disconnect();

        res.json({ message: "Signup successful" });

    } catch (error) {
        console.error("SIGNUP ERROR:", error.message);
        res.status(500).json({ error: error.message });
    }
});


// 🔐 LOGIN
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        const { gateway, contract } = await connect();

        const result = await contract.evaluateTransaction(
            'LoginUser',
            username,
            password
        );

        await gateway.disconnect();

        if (!result || result.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(JSON.parse(result.toString()));

    } catch (error) {
        console.error("LOGIN ERROR:", error.message);
        res.status(500).json({ error: error.message });
    }
});


// 🔥 REGISTER LAND
app.post('/register', async (req, res) => {
    const { id, owner, location } = req.body;

    if (!id || !owner || !location) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        const { gateway, contract } = await connect();

        await contract.submitTransaction(
            'CreateAsset',
            id,
            'blue',
            '10',
            owner,
            '100',
            location   // ✅ REQUIRED (6 params)
        );

        await gateway.disconnect();

        res.json({ message: "✅ Stored Successfully" });

    } catch (error) {
        console.error("REGISTER ERROR:", error.message);
        res.status(500).json({ error: error.message });
    }
});


// 🔍 QUERY LAND
app.get('/land/:id', async (req, res) => {
    try {
        const { gateway, contract } = await connect();

        const result = await contract.evaluateTransaction(
            'ReadAsset',
            req.params.id
        );

        await gateway.disconnect();

        if (!result || result.length === 0) {
            return res.status(404).json({ error: "Asset not found" });
        }

        res.json(JSON.parse(result.toString()));

    } catch (error) {
        console.error("QUERY ERROR:", error.message);
        res.status(404).json({ error: "Asset not found" });
    }
});


// 🔄 TRANSFER
app.post('/transfer', async (req, res) => {
    const { id, newOwner } = req.body;

    if (!id || !newOwner) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        const { gateway, contract } = await connect();

        await contract.submitTransaction(
            'TransferAsset',
            id,
            newOwner
        );

        await gateway.disconnect();

        res.json({ message: "🔄 Ownership Updated" });

    } catch (error) {
        console.error("TRANSFER ERROR:", error.message);
        res.status(500).json({ error: error.message });
    }
});


// 📍 GET BY LOCATION
app.get('/land/location/:loc', async (req, res) => {
    try {
        const location = decodeURIComponent(req.params.loc);

        const { gateway, contract } = await connect();

        const result = await contract.evaluateTransaction(
            'GetLandByLocation',
            location
        );

        await gateway.disconnect();

        if (!result || result.length === 0) {
            return res.status(404).json({ error: "No land found" });
        }

        res.json(JSON.parse(result.toString()));

    } catch (error) {
        console.error("LOCATION ERROR:", error.message);
        res.status(404).json({ error: "No land found" });
    }
});


// 📊 GET ALL
app.get('/land/all', async (req, res) => {
    try {
        const { gateway, contract } = await connect();

        const result = await contract.evaluateTransaction('GetAllAssets');

        await gateway.disconnect();

        if (!result || result.length === 0) {
            return res.json([]);
        }

        res.json(JSON.parse(result.toString()));

    } catch (error) {
        console.error("ALL ERROR:", error.message);
        res.status(500).json({ error: error.message });
    }
});


// 🚀 START SERVER
app.listen(3000, () => {
    console.log("🚀 Backend running on http://localhost:3000");
});