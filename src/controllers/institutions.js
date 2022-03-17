const Institution = require('../models/institution');
import AppError from '../util/appError';

async function getInstitutions(req, res, next) {
	try {
		const institutions = await Institution.find({});
		res.status(200).json({ institutions });
	} catch (err) {
		next(err);
	}
}

async function createInstitution(req, res, next) {
	try {
		if (!req.body.name || !req.body.domain) {
			throw new AppError('Missing a parameter in request body', 400);
		}
		const institutions = await Institution.create(req.body);
		res.status(201).json({
			status: 'success',
			data: {
				institutions,
			},
		});
	} catch (err) {
		next(err);
	}
}

async function deleteInstitution(req, res, next) {
	try {
		const institutions = await Institution.findById(req.params.id);
		if (!institutions) {
			throw new AppError('Institutions not found', 404);
		}
		await institutions.remove();
		res.status(200).json({
			status: 'success',
			message: 'Institutions has been deleted.',
		});
	} catch (err) {
		next(err);
	}
}

const institutionController = {
	getInstitutions,
	createInstitution,
	deleteInstitution,
};

module.exports = institutionController;
