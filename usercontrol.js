const Usermodel = require("./userscheme");
const staffregistration = (req, res) => {
  const newUser = new Usermodel({
    fname: req.body.fname,
    lname: req.body.lname,
    dob: req.body.dob,
    email: req.body.email,
    password: req.body.password,
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

const resetpassword = (req, res) => {
  Usermodel.updateOne({ email: req.body.email, password: req.body.password })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Password Update Successfully",
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

const stafflogin = (req, res) => {
  Usermodel.findOne({ email: req.body.email})
    .exec()
    .then((data) => {
      if (data) {
        if (req.body.password === data.password) {
          res.json({
            status: 200,
            msg: "Login Successfully",
            result: data,
          });
        } else {
          res.json({
            status: 500,
            msg: "Invalid Password",
          });
        }
      } else {
        res.json({
          status: 500,
          msg: "Invalid User Id",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Server error",
        error: err,
      });
    });
};

module.exports = {
  staffregistration,
  resetpassword,
  stafflogin,
};
