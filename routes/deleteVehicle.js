const db = require("../models");
const app = require("express");
const router = app.Router();

router.delete("/api/vehicles", (req, res) => {
    db.Maintenance
        .destroy({
            where: {
                VehicleId: req.query.id
            }
        })
        .then(
            db.Vehicle
                .destroy({
                    where: {
                        id: req.query.id
                    }
                })
                .then(() => res.status(200).send({ message: "Vehicle Deleted" }))
                .catch(() => res.status(401).send({ message: "Vehicle Not Deleted" }))
        )
        .catch(err => res.status(500).json(err));
});

module.exports = router;