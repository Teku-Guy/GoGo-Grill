const { Appointment } = require('../../models');

const appData = [
    {
		scheduled_date: '2021-07-22 04:05:00',
		customer_id: 1,
		grill_id: 1,
	},
]

const seedAppointments = () => Appointment.bulkCreate(appData);

module.exports = seedAppointments;