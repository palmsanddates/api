const express = require('express');

const checkAuth = require('../middlewares/checkAuth');
const checkRole = require('../middlewares/checkRole');

const router = express.Router();

const eventController = require('../controllers/events.js');
const {
	validate,
	createEvent,
	getEvents,
	getEvent,
	updateEvent,
	deleteEvent,
	createSuggestion,
	getSuggestions,
} = eventController;
const validateRules = require('../middlewares/validators/validateRules');

router.get('/', getEvents);
router.get('/:eventId', getEvent);

router.post(
	'/',
	checkAuth,
	checkRole(['super_admin', 'admin']),
	validate('createEvent'),
	validateRules,
	createEvent,
);
router.patch(
	'/:eventId',
	checkAuth,
	checkRole(['super_admin', 'admin']),
	validate('updateEvent'),
	validateRules,
	updateEvent,
);
router.delete(
	'/:eventId',
	checkAuth,
	checkRole(['super_admin', 'admin']),
	validate('deleteEvent'),
	validateRules,
	deleteEvent,
);
router.put(
	'/suggestions',
	checkAuth,
	checkRole(['super_admin', 'admin', 'user']),
	validate('createSuggestion'),
	validateRules,
	createSuggestion,
);
router.get(
	'/suggestions/:institutionId',
	checkAuth,
	checkRole(['super_admin', 'admin']),
	validate('getSuggestions'),
	validateRules,
	getSuggestions,
);

module.exports = router;
