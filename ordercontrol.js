const ordermodel = require("./orderscheme");

const addorder = (req, res) => {
    let flag=0
  req.body.state.map((x) => {
    const date = new Date();
    const newOrder = new ordermodel({
      foodid: x.foodid._id,
      userid: x.userid,
      paymentstatus: false,
      amount: x.foodid.price,
      count: x.count,
      date: date,
    });
    newOrder
      .save()
      .then((data) => {
       if(data){
        flag=1
       }
      })
      .catch((err) => {
        console.log("err on saving order",err);
      });
    })
    res.json({
      status: 200,
      msg: "Added Successfully",
    });
};

const vieworder = (req,res) => {
  ordermodel.find({userid: req.params.userid,paymentstatus: "false"})
  .exec()
  .then((data) => {
    res.json({
      status: 200,
      msg: "Viewed Successfully",
      result: data,
    });
  })
  .catch((err) => {
    res.json({
      status: 500,
      msg: "Not Viewed",
      error: err,
    });
  });
}

const cancelorder = (req,res) => {
  req.body.state.map((x) =>{
    ordermodel.findOneAndDelete({_id: x._id,paymentstatus:"false"}).exec()
    .then((data)=>{
      console.log(data)
    }).catch((err)=>{
      res.json({
        status: 500,
        msg: "Not Viewed",
        error: err,
      });
    })
    res.json({
      status: 200,
      msg: "Payment Cancelled"
    });
  })
}

const paymentstatus =(req,res) => {
  req.body.state.map((x) =>{
    ordermodel.findOneAndUpdate({_id:x._id,userid:x.userid,paymentstatus:"false"},{paymentstatus:"true"}).exec()
    .then((data)=>{console.log("Payment Status Success")})
    .catch((err)=>{
      res.json({
        status: 500,
        msg: "Payment not Done",
        error: err,
      });
    })
    res.json({
      status: 200,
      msg: "Payment Success"
    });
  })
}

const vieworderdetails = (req,res) => {
  ordermodel.find({userid: req.params.userid,paymentstatus: "true"}).populate("foodid")
  .exec()
  .then((data) => {
    res.json({
      status: 200,
      msg: "Viewed Successfully",
      result: data,
    });
  })
  .catch((err) => {
    res.json({
      status: 500,
      msg: "Not Viewed",
      error: err,
    });
  });
}

const viewcustomerorder = (req,res) => {
  ordermodel.find({paymentstatus: "true"}).populate("userid").populate("foodid")
  .exec()
  .then((data) => {
    res.json({
      status: 200,
      msg: "Viewed Successfully",
      result: data,
    });
  })
  .catch((err) => {
    res.json({
      status: 500,
      msg: "Not Viewed",
      error: err,
    });
  });
}

module.exports = { addorder, vieworder,cancelorder,paymentstatus,vieworderdetails,viewcustomerorder };
