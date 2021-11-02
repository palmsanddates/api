const express = require('express');
const checkAuth = require('../middlewares/checkAuth');
const checkRole = require('../middlewares/checkRole');
const router = express.Router();

const eventController = require('../controllers/events.js');
const { validate, createEvent, getEvents, getEvent, updateEvent, deleteEvent } =
	eventController;
const validateRules = require('../middlewares/validators/validateRules');

router.get('/', getEvents);
router.get('/:eventId', getEvent);

router.post(
	'/',
	checkAuth,
	checkRole(['super admin', 'admin']),
	validate('createEvent'),
	validateRules,
	createEvent,
);
router.patch(
	'/:eventId',
	checkAuth,
	checkRole(['super admin', 'admin']),
	validate('updateEvent'),
	validateRules,
	updateEvent,
);
router.delete(
	'/:eventId',
	checkAuth,
	checkRole(['super admin', 'admin']),
	validate('deleteEvent'),
	validateRules,
	deleteEvent,
);

module.exports = router;
