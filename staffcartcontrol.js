const staffcartmodel = require("./staffcartscheme");

const staffaddcart = async(req, res) => {
  const date = new Date();
  const newStaffcart = new staffcartmodel({
    foodid: req.params.foodid,
    staffid: req.body.staffid,
    count: req.body.count,
    date: date,
  });
  await newStaffcart
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Added Successfully",
        result: data,
      });
    })
    .catch((err) => {
    console.log("data not saved ",err);
    });
};

const staffviewcart = (req, res) => {
  staffcartmodel
    .find({staffid: req.params.staffid}).populate("foodid")
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

const staffdeletecartitem = (req, res) => {
  staffcartmodel
    .findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "data deleted",
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



module.exports = { staffaddcart, staffviewcart,staffdeletecartitem};
