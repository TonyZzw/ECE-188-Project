require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const activeCodes = {}; 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

const generateRandomCode = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = '';
    const random = () => Math.floor(Math.random() * characters.length);

    while (code.length < length) {
        code += characters[random()];
    }

    return code;
};

app.post('/login', async (req, res) => {
    const { email, password } = req.body; 
    if (!email || !password) {
        console.log('Missing email or password')
        return res.status(400).send('Missing email or password');
    }

    try {
        await client.connect();
        const usersCollection = client.db("userInfra").collection("users");

        const user = await usersCollection.findOne({ email: email });
        if (!user) {
            console.log('User does not exist')
            return res.status(404).send('User does not exist');
        }
        
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            console.log('Login successful')
            console.log(user.name)
            res.send({ username: user.name, email: user.email });
        } else {
            console.log('Password is incorrect')
            res.status(401).send('Password is incorrect');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('An error occurred during login');
    } 
});


app.post('/register', async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).send('Missing required fields');
    }

    try {
        await client.connect();
        const usersCollection = client.db("userInfra").collection("users");

        const existingUser = await usersCollection.findOne({ email: email });
        if (existingUser) {
            console.log('Existing User')
            return res.status(400).send('Email already registered');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const securityCode = generateRandomCode(6);
        activeCodes[securityCode] = { email, hashedPassword, name };

        console.log(`Registering user: ${name} with email: ${email}, hashed password: ${hashedPassword}, security code: ${securityCode}`);

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Verification Code",
            html: `<h1>Welcome, ${name}!</h1><p>Thank you for registering. Your security code is ${securityCode}.</p>`,
        });
        
        res.send({ message: 'Registration successful, email sent with security code!' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('An error occurred during registration');
    } 
});


app.post('/verify', async (req, res) => {
    const { code } = req.body;
    if (activeCodes[code]) {
        const userInfo = activeCodes[code];
        delete activeCodes[code]; 

        const usersCollection = client.db("userInfra").collection("users");
        await usersCollection.insertOne({
            email: userInfo.email,
            password: userInfo.hashedPassword,
            name: userInfo.name,
        });
        console.log(userInfo.name)
        res.send({ verified: true, username: userInfo.name, email:userInfo.email });
    } else {
        res.status(400).send({ verified: false, message: 'Incorrect or expired verification code.' });
    }
});

app.post('/confirmation', async (req, res) => {
    const { username, email, cartItems, totalPrice } = req.body;

    if (!email || cartItems.length === 0) {
        return res.status(400).send('Missing required fields or cart is empty');
    }

    try {

        const cartDetailsHTML = cartItems.map(item => 
            `<li>${item.name}, Size: ${item.size}, Quantity: ${item.quantity}, Price: $${item.totalPrice.toFixed(2)}</li>`
        ).join('');

        const emailContent = `
            <h1>Order Confirmation for ${username}</h1>
            <p>Thank you for your purchase!</p>
            <h3>Order Details:</h3>
            <ul>${cartDetailsHTML}</ul>
            <p>Total Price: $${totalPrice}</p>
        `;

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Order Confirmation",
            html: emailContent,
        });

        res.send({
            success: true,
            message: 'Confirmation email sent successfully!',
        });
    } catch (error) {
        console.error('Error during sending confirmation email:', error);
        res.status(500).send('An error occurred while sending confirmation email');
    } 
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectToMongoDB();
});
