const express = require("express")
const app = express();
const path = require("path")

app.use(express.static(path.join(__dirname,"dist")));


app.get("*",(req,res)=>{

        res.sendFile(path.join(__dirname,"dist","index.html"));
});

app.listen(80,(e)=>{
        console.log("running on 80");
});