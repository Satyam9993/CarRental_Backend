const Location = require("../../models/Location");

exports.getAllLocation = async (req, res) => {
    try {
        await Location.find().then(loc => {
            res.status(200).send({locations : loc});
        }).catch(err => {
            res.status(402).send({ success: false, error: "server error" });
        });
    } catch (error) {
        res.status(500).send({ success: false, error: "server error" });
    }
}