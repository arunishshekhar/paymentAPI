import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import router from "./routes/routers.js";

const app = express();
export const port = 5000;

app.use(bodyParser.json());
app.use(cors())

app.use("/",router);

app.get("/",(req,res) => { res.send("Hello")});
app.get("*",(req,res) => { res.send("Do not exist")})

app.listen(port, ()=>{
    console.log(`server on port ${port}`);
})