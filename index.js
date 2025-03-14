const express = require("express")
const mongoose = require('mongoose');
const AuthsUser = require("./routes/routes");
const{db, PORT} = require("./config/config")
const app = express();
const { notFound, errorHandler } = require("./middlewares/errorhandler");




//connect to mongodb
mongoose.connect(db)
.then(()=> console.log("connected to database"));

app.use(express.json({}));
app.use(express.urlencoded({extended: true}));

app.use("/auths", AuthsUser);

app.use(notFound);
app.use(errorHandler);




app.listen(PORT, ()=>{
  console.log(`app is running on specified ${PORT}`)
});