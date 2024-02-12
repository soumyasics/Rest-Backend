const staffordermodel = require("./stafforderscheme");

const staffaddorder = (req, res) => {
  req.body.state.map((x) => {
    const date = new Date();
    const newStafforder = new staffordermodel({
      foodid: x.foodid._id,
      staffid: x.staffid,
      paymentstatus: false,
      amount: x.foodid.price,
      count: x.count,
      date: date,
    });
    newStafforder
      .save()
      .then((data) => {
       if(data){
        console.log(data);
       }
      })
      .catch((err) => {
        console.log("err on saving order",err);
      });
    })
    res.json({
      status: 200,
      msg: "Added Successfully",
    });
};

module.exports = {staffaddorder}