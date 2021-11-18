const Club = require('../models/club');
import AppError from '../util/appError';

async function getClubs(req, res, next) {
	try {
		const clubs = await Club.find({}).populate('events');
		res.status(200).json({ clubs });
	} catch (err) {
		next(err);
	}
}

async function createClub(req, res, next) {
	try {
		if (!req.body.name) {
			throw new AppError('Missing name in request body', 400);
		}
		const club = await Club.create(req.body);
		res.status(201).json({
			status: 'success',
			data: {
				club,
			},
		});
	} catch (err) {
		next(err);
	}
}

async function deleteClub(req, res, next) {
	try {
		const club = await Club.findById(req.params.id);
		if (!club) {
			throw new AppError('Club not found', 404);
		}
		await club.remove();
		res.status(200).json({
			status: 'success',
			message: 'Club has been deleted.',
		});
	} catch (err) {
		next(err);
	}
}

const clubController = {
	getClubs,
	createClub,
	deleteClub,
};

module.exports = clubController;
