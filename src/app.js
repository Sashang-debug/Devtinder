const express = require("express");
const cookieParser = require("cookie-parser");
const {connectdb} = require("./Config/database");
const app = express();

app.use(express.json());
app.use(cookieParser());

const authrouter = require("./routes/auth");
const requestrouter = require("./routes/request");
const profilerouter = require("./routes/profile");
const userrouter = require("./routes/user");    

app.use("/",authrouter);
app.use("/",requestrouter);
app.use("/",profilerouter); 
app.use("/",userrouter);

connectdb().then(()=>{
    console.log("database is connected succesfully.");
    app.listen(3000,()=>{
     console.log("Server is listening on 3000");
    });

}).catch(err => {
    console.error("Databse cannot be connected.");
})

