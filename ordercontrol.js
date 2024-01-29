const ordermodel = require("./orderschema");

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
          msg: "Ordered Successfully",
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
  });
};

module.exports = { addorder };
