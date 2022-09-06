const { Router } = require('express');
const missingService = require('../services/missing.service');
const { error } = require('../logger');

const router = Router();

router.get('', async (req, res) => {
  let result = [];
  try {
    result = await missingService.getAllMissings();
  } catch (e) {
    error.data(e);
  }
  return res.json(result);
});

router.post('', (req, res) => {
  // Save missing and images if any
  res.json({});
});

router.get(':id', (req, res) => {
  // Get missing by id
  res.json({});
});

router.put(':id', (req, res) => {
  // Update missing
  res.json({});
});

router.put(':id/images', (req, res) => {
  // update images to a missing
  res.json({});
});

module.exports = router;
