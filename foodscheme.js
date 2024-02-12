const mongoose=require("mongoose")
const foodscheme=mongoose.Schema({
    foodname:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
    },
    descripition:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("newfoods",foodscheme)