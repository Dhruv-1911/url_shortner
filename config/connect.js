const mongoose = require("mongoose");

const connect_db =mongoose.connect(process.env.URL,{ useNewUrlParser: true,})
    .then(() => {
        console.log("Connect to Databse..")
    })
    .catch((err) => {
        console.log(err);
    })

module.exports=connect_db;