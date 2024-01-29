const mongoose=require("mongoose")
const orderscheme=mongoose.Schema({
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
    paymentstatus:{
        type:Boolean,
    },
    amount:{
        type:Number,
        require:true
    },
    count:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
    }
})

module.exports=mongoose.model("neworders",orderscheme)