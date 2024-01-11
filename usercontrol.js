const Usermodel = require("./userscheme");
const staffregistration = (req, res) => {
    const newUser = new Usermodel({
      fname: req.body.fname,
      lname: req.body.lname,
      dob:req.body.dob,
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

  const customerlogin = (req, res) => {
    Usermodel.findOne({ email: req.body.email }).exec()
        .then(data => {
            if (data) {
                if (req.body.password === data.password){
                    res.json({
                        status: 200,
                        msg: "Login successfully",
                        result: data,
                    })}
                    else {
                      res.json({
                          status: 500,
                          msg: "Invalid Password"
                      })
            }}
            else {
                res.json({
                    status: 500,
                    msg: "Invalid user Id"
                })
            }
        })
        .catch(err => {
            res.json({
                status: 500,
                msg: "Invalid User",
                error: err
            })
        })
}

  module.exports = {staffregistration,customerlogin};