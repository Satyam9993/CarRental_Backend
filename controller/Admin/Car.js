const Car = require('../../models/Cars');
const Joi = require('joi');
const JoiObjectId = require('joi-objectid')(Joi);

const Carschema = Joi.object({
    name: Joi.string().required(),
    imageSrc : Joi.string().uri().required(),
    desc: Joi.string().required(),
    imageAlt: Joi.string().required(),
    price : Joi.number().required(),
    location : JoiObjectId().required(),
    color : Joi.string().required(),
});
exports.AddCar=async (req, res, next)=>{
    try {
        const inputData = req.body;
        const { error, value } = Carschema.validate(inputData);

        if (error) {
            return res.status(422).send({ error: error.details[0].message })
        }
        console.log(req.admin.id);
        await Car.create({
            name: value.name,
            desc: value.desc,
            imageSrc : value.imageSrc,
            imageAlt: value.imageAlt,
            price : value.price,
            color : value.color,
            location : value.location,
            added_by : req.admin.id
        }).then(car=>{
            res.status(201).send({
                car: car
            })
        }).catch(error=> {
            return res.status(402).send({
                "err": error
            })
        })

    } catch (error) {
        next(error)
        return res.status(500).send({
            "err": error
        })
    }
}

exports.getAllCar = async(req, res, next)=>{
    try {
        // TODO

    } catch (error) {
        next(error)
        return res.status(500).send({
            "err": error
        })
    }
}