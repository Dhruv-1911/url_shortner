const mongoose = require("mongoose");

const connect_db =mongoose.connect('mongodb+srv://dhruvk:P5kB99LoKkF88inU@cluster0.ptx4wli.mongodb.net/shortUrl',{ useNewUrlParser: true,})
    .then(() => {
        console.log("Connect to Databse..")
    })
    .catch((err) => {
        console.log(err);
    })

module.exports=connect_db;