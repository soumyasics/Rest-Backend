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

const deletecartitem = (req, res) => {
  cartmodel
    .deleteOne({ id: req.body.id })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data Deleted",
        result: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Server error",
        error: err,
      });
    });
};

module.exports = { addcart,viewcart,deletecartitem };
