const express=require('express');
const db=require('./src/Db/db')

const bodyParser=require('body-parser');
const app=express();
const apis=require('./src/routes/userRoutes');

app.use(bodyParser.json());
app.use('/',apis);
app.listen(process.env.PORT,()=>{
    console.log("server started.");
});
