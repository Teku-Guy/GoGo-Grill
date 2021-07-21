const { Appointment } = require('../../models');

const appData = [
    {
        scheduled_data: '2021-07-22 04:05:00',
        customer_id: '2',
        grill_id: '1'
    }
]

const seedAppointments = () => Appointment.bulkCreate(appData);

module.exports = seedAppointments;