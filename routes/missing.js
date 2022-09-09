const { BaseError } = require('sequelize');
const { Router } = require('express');

const fileMiddleware = require('../middleware/file.middleware');
const missingService = require('../services/missing.service');
const { error: ErrorLogger } = require('../logger');
const ItemNotFound = require('../errors/ItemNotFound');
const { validateBodyAndCreateMissing } = require('../use-cases/missing');
const BadRequest = require('../errors/BadRequest');

const router = Router();

router.get('', async (req, res) => {
  const result = { data: [], count: 0 };
  try {
    result.data = await missingService.getAllMissings(req.query);
    result.count = await missingService.getTotalCountMissing();
  } catch (e) {
    ErrorLogger.error(e);
    if (e instanceof BaseError) {
      res.status(500);
    }
    return res.send();
  }
  return res.json(result);
});

router.post('', fileMiddleware.array('images', 5), async (req, res) => {
  try {
    const { missing, images } = await validateBodyAndCreateMissing(req.body, req.files);
    return res.status(201).json({ missing, images });
  } catch (e) {
    ErrorLogger.error(e);
    if (e instanceof BadRequest) {
      res.status(400);
    } else {
      res.status(500);
    }
    return res.send(e.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const missing = await missingService.getMissingById(req.params.id);
    return res.json(missing);
  } catch (e) {
    ErrorLogger.error(e);
    if (e instanceof ItemNotFound) {
      res.status(404);
    } else {
      res.status(500);
    }
    return res.send();
  }
});

router.put('/:id', async (req, res) => {
  try {
    await missingService.updateMissing(req.params.id, req.body);
    return res.status(200).send();
  } catch (e) {
    ErrorLogger.error(e);
    if (e instanceof ItemNotFound) {
      res.status(404);
    } else {
      res.status(500);
    }
    return res.send();
  }
});

router.put(':id/images', (req, res) => {
  // update images to a missing
  res.json({});
});

module.exports = router;
