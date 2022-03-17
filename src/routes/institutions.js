const express = require('express');
const router = express.Router();

const institutionController = require('../controllers/institutions.js');
const { getInstitutions, createInstitution, deleteInstitution } =
	institutionController;

router.get('/', getInstitutions);
router.post('/', createInstitution);
router.delete('/:id', deleteInstitution);

module.exports = router;
