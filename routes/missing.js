const { BaseError } = require('sequelize');
const { Router } = require('express');

const fileMiddleware = require('../middleware/file.middleware');
const missingService = require('../services/missing.service');
const uploadService = require('../services/upload.service');
const { error: ErrorLogger } = require('../logger');
const ItemNotFound = require('../errors/ItemNotFound');

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
    const missing = await missingService.saveMissing(req.body);
    let images = [];
    console.log(req.files);
    if (req.files && req.files.length > 0) {
      const files = await uploadService.uploadImages(req.files);
      console.log(files);
      images = await missingService.saveImages(missing.id, files);
    }
    return res.status(201).json({ missing, images });
  } catch (e) {
    ErrorLogger.error(e);
    return res.status(500);
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
  // Update missing
  // body = { missing: {} images: [{ id: '', url: '', remove: false|true }] }
  try {
    const result = await missingService.updateMissing(req.params.id, req.body);
    return res.json({});
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
