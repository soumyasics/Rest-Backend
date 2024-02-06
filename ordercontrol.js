const ordermodel = require("./orderscheme");

const addorder =async  (req, res) => {
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
       flag=1
      })
      .catch((err) => {
        console.log("err on saving order",err);
      });
  });

  res.json({
    status: 200,
    msg: "Added Successfully",
  });
 

  
  // console.log(req.body.state);
};

module.exports = { addorder };
