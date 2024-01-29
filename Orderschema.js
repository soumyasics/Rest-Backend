const mongoose =require("mongoose")
const Orderschema=mongoose.Schema({
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
    payments:{
type:Boolean,
required:false
    },
    count:{
        type:Number,
        required:true,
    },
    amount:{
type:Number,
required:true
    },
    date:{
        type:Date,
    }
})

module.exports=mongoose.model("neworders",Orderschema)