const order=require("./Orderschema")

const addorder = (req, res) => {
    const date = new Date();
    const neworder = new order({
      foodid: req.params.foodid,
      userid: req.body.userid,
      count: req.body.count,
      paymentstatus:req.body.paymentstatus,
      amount:req.body.amount,
      date: date
      
    });
    neworder
      .save()
      .then((data) => {
        res.json({
          status: 200,
          msg: "Added Successfully",
          result: data,
        });
      })
      .catch((err) => {
        res.json({
          status: 500,
          msg: "Server Error",
          error: err,
        });
      });
  };
  module.exports={addorder}