const express=require('express');
const path=require("path");

const app=express();
app.use(cors());
app.use(express.static('./dist/mean-app'));

app.get("/*",(req,res)=>{
  res.sendFile('index.html',{root:'dist/mean-app/'})
})

app.listen(process.env.PORT||8080)
