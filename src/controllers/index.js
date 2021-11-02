exports.index = (req, res, next) => {
	try {
		return res.status(200).send({ message: 'Hello From Backend!' });
	} catch (error) {
		next(error);
	}
};
