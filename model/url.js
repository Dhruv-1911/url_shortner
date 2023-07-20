const mongoose = require("mongoose")

//create a Admin database
const urlSchema = mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    redirectURL:{
        type:String,
        required:true
    },
    visitHistory:[ { 
        timestamp:{ type:Number}
    }]
},
{
    timestamps: true
});

module.exports=mongoose.model('url',urlSchema)