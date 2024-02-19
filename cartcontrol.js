const cartmodel = require("./cartscheme");

const addcart = async(req, res) => {
  const date = new Date();
  let flag=0, count=0
//testing whether food already added to cart
await cartmodel.find({
  foodid: req.params.foodid,
  userid: req.body.userid,
}).exec().then(datas=>{
if(datas.length>0){
  flag=1}
count=datas[0].count
console.log("count",count);
}) .catch((err) => {
      res.json({
        status: 500,
        msg: "Server Error",
        error: err,
      });
    });

if(flag==0){
  const newCart = new cartmodel({
    foodid: req.params.foodid,
    userid: req.body.userid,
    count: req.body.count,
    date: date,
  });
  await newCart
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
  }else{
    console.log("count",count+parseInt(req.body.count));

await cartmodel.findOneAndUpdate({ foodid: req.params.foodid,
  userid: req.body.userid},{count:count+parseInt(req.body.count)}).exec().then(datas=>{
    console.log("updated");
  }) .catch((err) => {
    res.json({
      status: 500,
      msg: "Server Error",
      error: err,
    });
  });

    res.json({
      status: 500,
      msg: "Already added to cart!! Count of Food updated to "+ (count+parseInt(req.body.count)),
    });
  }
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
    .findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Order Confirmed",
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

const deletecart= (req, res) => {
  cartmodel
    .deleteMany({ userid: req.params.userid })
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

module.exports = { addcart,viewcart,deletecartitem,deletecart };
