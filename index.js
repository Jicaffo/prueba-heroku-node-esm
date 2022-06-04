import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5050;
const userName = process.env.NAME;


// Settings
app.set("port", PORT);


// Middlewares
app.use(cors());
app.use(morgan('dev'));


// Routes
app.use("/", (req, res) =>{
    res.status(200).json({
        msg: `Hi, ${userName}! Petition recieved on route '${req.url}'`,
    })
})


// Starting Server
app.listen(app.get("port"), () => console.log(`*** App listening on port ${app.get("port")} ***`));