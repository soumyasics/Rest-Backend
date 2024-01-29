const cartmodel = require("./cartscheme");

const addcart = (req, res) => {
  const date = new Date();
  const newCart = new cartmodel({
    foodid: req.params.foodid,
    userid: req.body.userid,
    count: req.body.count,
    date: date,
  });
  newCart
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

const viewcart = (req, res) => {
  cartmodel
    .find({userid: req.params.userid}).populate("foodid")
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
};

module.exports = { addcart,viewcart };
