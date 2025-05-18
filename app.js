
 const express = require("express");
 const app = express();
const port = 3000;
 const env = require("dotenv").config();


app.use(express.static("./app/public"));

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.json());
app.use(express.urlencoded({extended:true}));



const rotas = require("./app/routes/router");
app.use("/", rotas);


app.listen(process.env.APP_PORT, ()=>{
    console.log(`Servidor onLine!\nhttp://localhost:${process.env.APP_PORT}`);
});

