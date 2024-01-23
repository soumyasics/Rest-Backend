const mongoose=require("mongoose")
const cartscheme=mongoose.Schema({
    foodid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"newfoods",
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"newusers",
    },
    count:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
    }
})

module.exports=mongoose.model("newcarts",cartscheme)