const Usermodel = require("./userscheme");
const userregistration = (req, res) => {
    const newUser = new Usermodel({
      fname: req.body.fname,
      lname: req.body.lname,
      dob:req.body.dob,
      email: req.body.email,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword,
      contactno: req.body.contactno,
    });
    newUser
      .save()
      .then((data) => {
        res.json({
          status: 200,
          msg: "insert successfully",
          result: data,
        });
      })
      .catch((err) => {
        res.json({
          status: 500,
          msg: "not inserted",
          error: err,
        });
      });
  };

  module.exports = {
    userregistration
  };