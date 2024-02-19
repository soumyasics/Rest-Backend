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
    amount: req.body.amount,
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

const viewone = (req,res) => {
  foodmodel
    .findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "error",
        data: err,
      });
    });
}

const editfood = (req,res) => {
  foodmodel.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    {
      foodname: req.body.foodname,
      image: req.file,
      price: req.body.price,
      descripition: req.body.descripition,
    }
  )
  .exec()
  .then((data) => {
    res.status(200).json({
      status: 200,
      data: data,
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      status: 500,
      data: err,
    });
  });
}

const deletefood = (req, res) => {
  foodmodel
    .findByIdAndDelete({ _id: req.params.id })
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

module.exports = { addfood, viewfood, upload, deletefood, viewone, editfood};
