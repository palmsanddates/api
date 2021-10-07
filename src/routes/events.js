const express = require('express');
const checkAuth = require('../middlewares/checkAuth');

const router = express.Router();

const eventController = require('../controllers/events.js');
const { validate, createEvent, getEvents, getEvent, updateEvent, deleteEvent } =
  eventController;
const validateRules = require('../middlewares/validators/validateRules');

router.get('/', getEvents);
router.get('/:eventId', validate('createEvent'), validateRules, getEvent);

router.post(
  '/',
  checkAuth,
  validate('createEvent'),
  validateRules,
  createEvent
);
router.patch(
  '/:eventId',
  checkAuth,
  validate('updateEvent'),
  validateRules,
  updateEvent
);
router.delete(
  '/:eventId',
  checkAuth,
  validate('deleteEvent'),
  validateRules,
  deleteEvent
);

module.exports = router;
