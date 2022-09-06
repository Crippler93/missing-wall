const { DatabaseError } = require('sequelize');
const { Router } = require('express');
const missingService = require('../services/missing.service');
const { error } = require('../logger');

const router = Router();

router.get('', async (req, res) => {
  const result = { data: [], count: 0 };
  try {
    let { offset = 0, limit = 5 } = req.query;
    offset = Number(offset);
    limit = Number(limit);
    result.data = await missingService.getAllMissings(offset, limit);
    result.count = await missingService.getTotalCountMissing();
  } catch (e) {
    error.error(e);
    if (e instanceof DatabaseError) {
      res.status(500);
    }
    return res.send();
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
