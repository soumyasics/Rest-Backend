const staffcartmodel = require("./staffcartscheme");

const staffaddcart = async(req, res) => {
  const date = new Date();
  let flag=0, count=0
//testing whether food already added to cart
await staffcartmodel.find({
  foodid: req.params.foodid,
  staffid: req.body.staffid,
}).exec().then(datas=>{
if(datas.length>0){
  flag=1}
count=datas[0].count
console.log("count",count);
}) .catch((err) => {
      console.log("err",err);
    });

if(flag==0){
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
  }else{
    console.log("count",count+parseInt(req.body.count));

await staffcartmodel.findOneAndUpdate({ foodid: req.params.foodid,
  staffid: req.body.staffid},{count:count+parseInt(req.body.count)}).exec().then(datas=>{
    console.log("updated");
  }) .catch((err) => {
    console.log("not updated");
  });

    res.json({
      status: 500,
      msg: "Already added to cart!! Count of Food updated to "+ (count+parseInt(req.body.count)),
    });
  }
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

const staffdeletecart= (req, res) => {
  staffcartmodel
    .deleteMany({ staffid: req.params.staffid })
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

module.exports = { staffaddcart, staffviewcart,staffdeletecartitem,staffdeletecart };
