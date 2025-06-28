const express = require('express');
const router = express.Router();
const {
  createExperience,
  getAllExperiences,
  getExperiencesByUser,   // <-- new
  updateExperience,
  deleteExperience
} = require('../controllers/experienceController');

router.post('/', createExperience);
router.get('/', getAllExperiences);
router.get('/:userId', getExperiencesByUser);  
router.put('/:id', updateExperience);
router.delete('/:id', deleteExperience);

module.exports = router;
