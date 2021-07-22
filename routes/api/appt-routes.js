const router = require('express').Router();
const { Appointment }  = require('../../models');


//The `api/appts/` endpoint

//get all Appt and associated grill and user information
router.get('/', (req, res) => {
    Appointment.findAll()
    .then(apptData => res.json(apptData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;