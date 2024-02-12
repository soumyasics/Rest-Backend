const mongoose = require("mongoose")
const stafforderscheme = mongoose.Schema({
    foodid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"newfoods",
    },
    staffid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"newstaffs",
    },
    paymentstatus:{
        type:Boolean,
        required:false,
    },
    amount:{
        type:Number,
        required:true,
    },
    count:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
    }
})

module.exports=mongoose.model("newstafforders",stafforderscheme)