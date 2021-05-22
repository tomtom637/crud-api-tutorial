const Thing = require('../models/thing');
const fs = require('fs');

// POST ONE
exports.createThing = async (req, res, next) => {
  req.body.thing = JSON.parse(req.body.thing);
  const url = req.protocol + '://' + req.get('host');
  const thing = new Thing({
    title: req.body.thing.title,
    description: req.body.thing.description,
    imageUrl: url + '/images/' + req.file.filename,
    price: req.body.thing.price,
    userId: req.body.thing.userId
  });
  try {
    await thing.save();
    res.status(201).json({ message: 'Post saved successfully!' });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

// GET ONE
exports.getOneThing = async (req, res, next) => {
  try {
    const thing = await Thing.findOne({ _id: req.params.id });
    res.status(200).json(thing);
  } catch (err) {
    res.status(404).json({ error: err });
  }
}

// PUT ONE
exports.modifyThing = async (req, res, next) => {
  let thing = new Thing({ _id: req.params.id });
  if(req.file) {
    req.body.thing = JSON.parse(req.body.thing);
    const url = req.protocol + '://' + req.get('host');
    thing = {
      _id: req.params.id,
      title: req.body.thing.title,
      description: req.body.thing.description,
      imageUrl: url + '/images/' + req.file.filename,
      price: req.body.thing.price,
      userId: req.body.thing.userId
    };
    const thingy = await Thing.findOne({ _id: req.params.id });
    const filename = thingy.imageUrl.split('/images/')[1];
    fs.unlink('images/' + filename, () => true);    
  } else {
    thing = {
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId
    };
  }
  try {
    await Thing.updateOne({_id: req.params.id}, thing);
    res.status(201).json({ message: 'Thing updated successfully!' });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// DELETE ONE
exports.deleteThing = async (req, res, next) => {
  try {
    const thing = await Thing.findOne({ _id: req.params.id });
    const filename = thing.imageUrl.split('/images/')[1];
    fs.unlink('images/' + filename, async () => {
      await Thing.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: 'Deleted!' });
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

// GET ALL
exports.getAllStuff = async (req, res, next) => {
  try {
    const things = await Thing.find();
    res.status(200).json(things);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};