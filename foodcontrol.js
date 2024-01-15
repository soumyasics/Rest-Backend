const foodmodel= require("./foodscheme");

const addfood = (req,res) => {
    const newFood  = new foodmodel({
        foodname: req.body.foodname,
        image: req.body.image,
        price: req.body.price,
        descripition: req.body.descripition
    })
    newFood.save().then((data) => {
        res.json({
            status:200,
            msg: "Food added Successfully",
            result: data,
        })
    }).catch((err) => {
        res.json({
            status:500,
            msg: "Server Error",
            error: err,
        })
    })
}

const viewfood = (req, res) => {
    foodmodel.find()
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

module.exports  = {addfood,viewfood}