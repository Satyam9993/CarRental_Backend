const Car = require("../../models/Cars");

exports.getAllCars = async (req, res) => {
    try {
        const {
            location
        } = req.query;
        if(!location) return res.status(402).send({ success: false, error: "data is missing error" })
        await Car.find({ location : location, isbooked : false }).then(cars => {
            res.status(200).send({cars : cars});
        }).catch(err => {
            res.status(402).send({ success: false, error: "server error" });
        });
    } catch (error) {
        res.status(500).send({ success: false, error: "server error" });
    }
}