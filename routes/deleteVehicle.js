const db = require("../models");
const app = require("express");
const router = app.Router();

router.delete("/api/vehicles", (req, res) => {
    // console.log(req.body.id);
    db.Maintenance
        .destroy({
            where: {
                VehicleId: req.body.id
            }
        })
        .then(() => res.status(200).send({ message: "Maintenance Deleted" }))
        .catch(() => res.status(401).send({ message: "Maintenance Not Deleted" }));
    db.Vehicle
        .destroy({
            where: {
                id: req.body.id
            }
        })
        .then(() => res.status(200).send({ message: "Vehicle Deleted" }))
        .catch(() => res.status(401).send({ message: "Vehicle Not Deleted" }));
});

module.exports = router;