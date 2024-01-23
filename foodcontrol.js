const foodmodel = require("./foodscheme");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

const addfood = (req, res) => {
  const newFood = new foodmodel({
    foodname: req.body.foodname,
    image: req.file.filename,
    price: req.body.price,
    descripition: req.body.descripition,
  });
  newFood
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Food added Successfully",
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

const viewfood = (req, res) => {
  foodmodel
    .find()
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

const deletefood = (req, res) => {
  foodmodel
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


const foodedit = (req, res) => {
  foodmodel
    .find()
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "updated Successfully",
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

module.exports = { addfood, viewfood, upload, deletefood,foodedit };
