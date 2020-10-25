const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const { isAuth } = require('../../middlewares/auth');

router.post('/new/post/:username', isAuth, (req, res) => {
  const profile = req.params.username;
  const { message } = req.body;
  let { extra = null } = req.body;
  const { _id: author } = req.user;

  if (extra.value && extra.extraType) {
    extra.value = extra.value.split('=')[1];
  } else {
    extra = null;
  }


  new Post({ author, profile, message, extra })
    .save()
    .then(newPost => {
      Post.populate(newPost, { path: 'author' }, (err, populatedPost) => {
        res.status(200).json({
          code: 200,
          response: populatedPost
        })
      })
    })
    .catch(e => res.status(500).send("We couldn't save your post."));
});

module.exports = router;
