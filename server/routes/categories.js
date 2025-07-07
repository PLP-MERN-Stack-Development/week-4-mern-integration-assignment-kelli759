const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { categorySchema } = require('../validators/categoryValidator');

// Get all categories
router.get('/', async (req, res) => {
  const categories = await Category.find();
  res.json({ message: 'All categories' });
});

// Create new category
router.post('/', async (req, res, next) => {
  const { name } = req.body;
   res.status(201).json({ message: `Category '${name}' created.` });
  const { error } = categorySchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Category already exists' });
    } else {
      next(err);
    }
  }
});

module.exports = router;
