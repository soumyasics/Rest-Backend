const order=require("./Orderschema")

const addorder = (req, res) => {
    req.body.state.map((x)=>{
    const date = new Date();
    const neworder = new order({
      foodid: x.foodid_id,
      userid: x.userid,
      count: x.count,
      paymentstatus:false,
      amount:x.foodid.price,
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
    })
  };
  module.exports={addorder}