const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { isAuth } = require('../../middlewares/auth');
const Jimp = require('jimp');
const multer = require('multer');
const path = require('path');
const shortId = require('shortid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', 'public/images/avatars'))
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.username}.png`);
  }
})

const upload = multer({ storage: storage });

router.patch('/privacy', isAuth, (req, res) => {
  const { _id } = req.user;

  User.findById(_id)
    .then(user => {
      user.openProfile = !user.openProfile;
      return user.save();
    })
    .then(updatedUser => {
      res.status(200).send({
        code: 200,
        message: 'Privacy updated',
        response: updatedUser
      });
    })
    .catch(e => res.status(500).send({ code: 500, message: 'Unexpected error' }));
});

router.patch('/description', isAuth, (req, res) => {
  const { _id } = req.user;
  const { description } = req.body;

  if (description.length > 150)
    return res.status(400).json({
      code: 400,
      message: "Your description can't be longer than 150 characters"
    });

  User.findByIdAndUpdate(_id, { description: description }, { new: true, useFindAndModify: false })
    .then(updatedUser => {
      updatedUser = updatedUser.toObject();

      res.status(200).json({
        code: 200,
        message: 'Description updated!',
        response: {
          newDescription: updatedUser.description,
          updatedUser
        }
      })
    })
    .catch(e => res.status(500).send(e));
});

router.patch('/profilePicture', [isAuth, upload.single('newImage')], (req, res) => {
  const { _id } = req.user;

  if (!req.file)
    res.status(500).json({ code: 500, response: "There were an error" });

  const { x, y, width, height } = JSON.parse(req.body.crop);

  Jimp.read(path.resolve(req.file.destination, req.file.filename), (err, imageToCrop) => {
    if (err) throw err;
    imageToCrop
      .crop(x, y, width, height)
      .resize(150, 150)
      .quality(100)
      .write(path.resolve(req.file.destination, req.file.filename)); // save
  });

  User.findByIdAndUpdate(_id, { profilePic: `images/avatars/${req.file.filename}` }, { new: true, useFindAndModify: false })
    .then(updatedUser => {
      res.status(200).json({
        code: 200,
        response: {
          message: 'Foto cambiada con exito',
          path: `${updatedUser.profilePic}?hash=${shortId.generate()}`,
          updatedUser
        }
      })
    })
    .catch(e => res.status(500).send(e));
})

module.exports = router;