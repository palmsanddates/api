const express = require('express');
const router = express.Router();

const eventController = require('../controllers/events.js');
const { validate, createEvent, getEvents, getEvent, updateEvent, deleteEvent } =
  eventController;
const validateRules = require('../middlewares/validators/validateRules');

router.get('/', getEvents);
router.get('/:eventId', validate('createEvent'), validateRules, getEvent);
router.post('/', validate('createEvent'), validateRules, createEvent);
router.patch('/:eventId', validate('updateEvent'), validateRules, updateEvent);
router.delete('/:eventId', validate('deleteEvent'), validateRules, deleteEvent);

module.exports = router;
