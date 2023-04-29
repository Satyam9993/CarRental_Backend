const Location = require('../../models/Location');
const Joi = require('joi');

const cordSchema = Joi.object({
    long: Joi.number().required(),
    lat: Joi.number().required()
}).required();
const LocationSchema = Joi.object({
    name: Joi.string().required(),
    cordinate: cordSchema,
});

exports.AddLocation = async (req, res, next) => {
    try {
        const inputData = req.body;
        const { error, value } = LocationSchema.validate(inputData);

        if (error) {
            return res.status(422).send({ error: error.details[0].message })
        }
        await Location.create({
            name : value.name,
            cordinate : value.cordinate,
            added_by : req.admin.id
        }).then((loc)=>{
            return res.status(201).send({loc : loc})
        }).catch((err)=>{
            res.status(400).send({
                error: "err"
            })
        });

    } catch (error) {
        res.status(500).send({
            error: error
        })
    }
};