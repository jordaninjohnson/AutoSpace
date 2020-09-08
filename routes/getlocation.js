const app = require("express");
const router = app.Router();
const axios = require("axios");

router.post("/api/location", (req, res) => {
    axios
        .get("https://geocode.xyz/" + req.body.coordinates + "?json=1")
        .then(data => {
            res.status(200).send({ message: data.data.city + " " + data.data.statename });
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;