const ordermodel = require("./orderscheme");

const addorder = (req, res) => {
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
        res.json({
          status: 200,
          msg: "Added Successfully",
          result: data,
        });
      })
      .catch((err) => {
        console.log("err on saving order",err);
      });
  });
  // console.log(req.body.state);
};

module.exports = { addorder };
