const express=require('express');
const path=require("path");
const cors = require('cors');
const bodyParser=require('body-parser');


const app=express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({origin:'https://listazadan.herokuapp.com'}));
app.use(express.static('./dist/mean-app'));

app.get("/*",(req,res)=>
  res.sendFile('index.html',{root:'dist/mean-app/'})
)

app.listen(process.env.PORT||5100)
