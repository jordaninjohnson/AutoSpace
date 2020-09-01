const db = require("../models");
const app = require("express");
const router = app.Router();

router.post("/api/mileage", (req, res) => {
    db.Vehicle
        .update({ mileage: req.body.mileage }, {
            where: {
                id: req.body.id
            }
        })
        .then(() => res.status(200).send({ message: "Updated" }))
        .catch(() => res.status(401).send({ message: "Not Updated" }));
});

module.exports = router;