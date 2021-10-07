const createError = require('http-errors');
const { param, body } = require('express-validator');

const Event = require('../models/event');

const checkEndTime = require('../middlewares/validators/checkEndTime');
const checkMongodbId = require('../middlewares/validators/checkMongodbId')


function validate(method) {
  switch (method) {
    case 'getEvent':
      return [
        param('eventId')
          .exists()
          .notEmpty()
          .isString()
          .trim()
          .custom(checkMongodbId),
      ];
    case 'createEvent':
      return [
        body('name').exists().notEmpty().isString().trim(),
        body('location').exists().notEmpty().isString().trim(),
        body('start_time')
          .exists()
          .withMessage('start_time must be provided.')
          .bail()
          .isISO8601()
          .withMessage('start_time must be a date with ISO8601 standards.')
          .bail()
          .toDate()
          .isAfter()
          .withMessage('start_time must be after current time.')
          .bail(),
        body('end_time')
          .optional()
          .isISO8601()
          .withMessage('end_time must be a date with ISO8601 standards.')
          .bail()
          .toDate()
          .isAfter()
          .withMessage('end_time must be after current time.')
          .bail()
          .custom(checkEndTime)
          .withMessage('start_time must be before end_time.')
          .bail(),
      ];
    case 'updateEvent':
      return [
        param('eventId')
          .exists()
          .notEmpty()
          .isString()
          .trim()
          .custom(checkMongodbId),
      ];
    case 'deleteEvent':
      return [
        param('eventId')
          .exists()
          .notEmpty()
          .isString()
          .trim()
          .custom(checkMongodbId),
      ];
    default:
      return [];
  }
}

async function getEvents(req, res, next) {
  try {
    const events = await Event.find({});
    return res.status(200).json(events);
  } catch (error) {
    next(error);
  }
}

async function getEvent(req, res, next) {
  try {
    const event = await Event.findById(req.params.eventId);
    return res.status(200).json(event);
  } catch (error) {
    next(error);
  }
}

async function createEvent(req, res, next) {
  try {
    const newEvent = new Event(req.body);
    const savedNewEvent = await newEvent.save();
    return res
      .status(201)
      .json({ id: savedNewEvent._id });
  } catch (error) {
    next(error);
  }
}

async function updateEvent(req, res, next) {
  try {
    const event = req.body;
    await Event.updateOne(
      {
        _id: req.params.eventId,
      },
      {
        $set: event,
      }
    );
    return res.status(201).json({
      id: req.params.eventId,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteEvent(req, res, next) {
  try {
    await Event.findOneAndDelete({
      _id: req.params.eventId,
    });
    return res.status(200).json({ message: 'Deleted.' })
  } catch (error) {
    next(error);
  }
}

const eventController = {
  validate,
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};

module.exports = eventController;
