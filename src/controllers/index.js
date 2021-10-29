exports.index = (req, res, next) => {
	try {
		return res.status(200).send({ message: 'Hello From Backend!' });
	} catch (err) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};
