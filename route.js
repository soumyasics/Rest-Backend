const express=require("express")
const usercontrol=require("./usercontrol")
const router=express.Router()
router.post('/staffregistration',usercontrol.staffregistration)
router.post('/customerlogin',usercontrol.customerlogin)

module.exports=router