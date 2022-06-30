import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bcrypt from 'bcrypt';

// Declaración e inicialización de variables y funciones
const app = express();
const PORT = process.env.PORT || 5050;
const userName = process.env.NAME;
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const stack = [
    "Node, with ES6 Modules",
    "express",
    "morgan",
    "dotenv, with enviroment variables.",
    "cors",
    "bcrypt",
]

const hashValue = async (value) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(value, salt);
};


// Settings
app.set("port", PORT);


// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


// Routes
app.get("/", async (req, res) =>{
    if (req.body) console.log("body object recieved: ", req.body);
    res.status(200).json({
        msg: `Hi, ${userName}! This VERY SIMPLE app just shows your name and the subroute you are in. For example, in this case you are at: '${req.url}'. Try another route!`,
        saltedHashName: await hashValue(userName),
        stack,
        originalRequestData: {
            headers: req.headers,
            protocol: req.protocol,
            method: req.method,
            url: req.url, // Alternativas podrían ser originalUrl o path
            params: req.params,
            query: req.query,
            body: req.body || null,
        },
    })
})

app.use("/", async (req, res) =>{
    if (req.body) console.log("body object recieved: ", req.body);
    console.log("Headers recieved: ", req.headers);
    res.status(200).json({
        msg: `Hi, ${userName}! This ${req.method} request was recieved at route '${req.url}'`,
        saltedHashName: await hashValue(userName),
        stack,
        originalRequestData: {
            headers: req.headers,
            protocol: req.protocol,
            method: req.method,
            url: req.url, // Alternativas podrían ser originalUrl o path
            params: req.params,
            query: req.query,
            body: req.body || null,
        },
    })
})


// Starting Server
app.listen(app.get("port"), () => console.log(`*** App listening on port ${app.get("port")} ***`));