const createError = require('http-errors');
const { param, body } = require('express-validator');

const Event = require('../models/event');
const checkEndTime = require('../middlewares/validators/checkEndTime');
const checkMongodbId = require('../middlewares/validators/checkMongodbId');
const doImgUpload = require('../util/doImgUpload');

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
		res.status(error.statusCode || 500).json({ message: error.message });
	}
}

async function getEvent(req, res, next) {
	try {
		const event = await Event.findById(req.params.eventId);
		return res.status(200).json(event);
	} catch (error) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
}

async function createEvent(req, res, next) {
	try {
		const { name, location, start_time, end_time, flyer_img } = req.body;
		const flyerImgKey = await doImgUpload(
			process.env.DO_SPACES_NAME,
			req.user._id,
			flyer_img,
		);
		const newEvent = new Event({
			creator: req.user._id,
			name,
			location,
			start_time,
			end_time,
			flyer_img_url: `${process.env.DO_SPACES_SUBDOMAIN}/${flyerImgKey}`,
		});

		const savedNewEvent = await newEvent.save();
		return res.status(201).json({ id: savedNewEvent._id });
	} catch (error) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
}

async function updateEvent(req, res, next) {
	try {
		const updatedEvent = req.body;
		const foundEvent = await Event.findById(req.params.eventId);

		if (!foundEvent) {
			return new AppError('Event not found.', 404);
		}

		if (!foundEvent.creator.equals(req.user._id)) {
			return new AppError('You are not the creator of the event.', 401);
		}

		await Event.updateOne(
			{
				_id: req.params.eventId,
			},
			{
				$set: updatedEvent,
			},
		);
		return res.status(201).json({
			id: req.params.eventId,
		});
	} catch (error) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
}

async function deleteEvent(req, res, next) {
	try {
		const foundEvent = await Event.findById(req.params.eventId);

		if (!foundEvent) {
			return new AppError('Event not found.', 401);
		}

		if (!foundEvent.creator.equals(req.user._id)) {
			return new AppError('You are not the creator of the event.', 401);
		}
		await Event.findOneAndDelete({
			_id: req.params.eventId,
		});
		return res.status(200).json({ message: 'Deleted.' });
	} catch (error) {
		res.status(error.statusCode || 500).json({ message: error.message });
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
