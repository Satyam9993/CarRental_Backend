const Joi = require('joi');
const Admin = require('../../models/Admin');
const AdminId = require('../../models/adminId');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET_ADMIN;

// Schema for login
const Loginschema = Joi.object({
    adminId:  Joi.number().required(),
    password: Joi.string().required(),
});
exports.AdminLogin = async (req, res) => {
    try {
        
        const inputData = req.body;
        const { error, value } = Loginschema.validate(inputData);

        if (error) {
            return res.status(422).send({ error: error.details[0].message })
        }

        await Admin.findOne({ adminId: value.adminId }).then(async (admin) => {
        await bcrypt.compare(value.password, admin.password).then((bc) => {
            if (bc) {
              const payload = {
                admin: {
                  id: admin.id,
                },
              };
              const authToken = jwt.sign(payload, JWT_SECRET);
              res.status(200).send({
                        success: "true",
                        adminauthToken: authToken,
                        adminId: admin.id,
                    });
            } else {
              res
                .status(401)
                .send({ success: "false", msg: "Authentification failed" });
            }
          })
          .catch((err) => {
            res.status(401).send({ error: err });
          });
      })
      .catch((err) => {
        res.status(401).send({ error: err });
      });
    } catch (error) {
        return res.status(500).send({
            "err": err
        })
    }
}

// Schema for Signin
const SignInschema = Joi.object({
    email:  Joi.string().email().required(),
    password: Joi.string().required(),
});

exports.AdminSignIn = async (req, res) => {
    try {

        const inputData = req.body;
        const { error, value } = SignInschema.validate(inputData);

        if (error) {
            return res.status(422).send({ error: error.details[0].message })
        }

        const {adminId} = await AdminId.findById({_id : "644bd3faa533572663801676"})
        const salt = await bcrypt.genSalt(10);
        const secured_password = await bcrypt.hash(value.password, salt);
        await Admin.create({
            email : value.email,
            adminId : adminId,
            password : secured_password
        }).then(async (admin)=>{
            if(admin){
                await AdminId.findByIdAndUpdate({_id : "644bd3faa533572663801676"}, {
                    $set :{
                        adminId : adminId + 1
                    }
                }).then((d)=>{
                    return res.status(201).send({
                        "admin" : admin
                    })
                }).catch((error)=>{
                    return res.status(402).send({
                        err : "error in updating adminId"
                    })
                })
            }
        }).catch(err=>{
            return res.status(402).send({
                err : "Something went wrong"
            })
        })
    } catch (err) {
        return res.status(500).send({
            "err": err
        })
    }
}