const ordermodel = require("./orderscheme");

const addorder = (req, res) => {
    let flag=0
  req.body.state.map((x) => {
    const date = new Date();
    ordermodel.find({
      foodid: x.foodid._id,
      userid: x.userid,
    }).exec().then(data=>{
    if(data.length>0){
      console.log("Already Added")
    }
    else{
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
    }
    })
    res.json({
      status: 200,
      msg: "Added Successfully",
    });
  });
};

const vieworder = (req,res) => {
  ordermodel.find({userid: req.params.userid})
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

module.exports = { addorder, vieworder };
