const express = require('express');
const checkAuth = require('../middlewares/checkAuth');
const checkRole = require('../middlewares/checkRole');
const router = express.Router();

const clubController = require('../controllers/clubs.js');
const { getClubs, getInstitutionClubs, createClub, deleteClub } =
	clubController;

router.get('/', getClubs);
router.get('/:institutionId', getInstitutionClubs);
router.post('/', createClub);
router.delete('/:id', deleteClub);

module.exports = router;
