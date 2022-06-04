//import 'dotenv/config';
import express from 'express';
//import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 5050;


app.use("/", (req, res) =>{
    res.status(200).json({
        msg: `Petition recieved on route '${req.originalUrl}'`,
    })
})

app.listen(PORT, () => console.log(`*** App listening on port ${PORT} ***`))