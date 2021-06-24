const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../Utils/auth');
const sequelize = require('../../config/connection');
router.get('/', (req, res) => {
   Comment.findAll({})
       .then(commentData => res.json(commentData))
       .catch(err => {
           console.log(err);
           res.status(500).json(err);
       })
});

// Click into a specific comment
router.get('/:id', (req, res) => {
   Comment.findAll({
           where: {
               id: req.params.id
           }
       })
       .then(commentData => res.json(commentData))
       .catch(err => {
           console.log(err);
           res.status(500).json(err);
       })
});

// When a loggedIn user posts a comment, store text, post and user ids
router.post('/', withAuth, (req, res) => {
   if (req.session) {
       // Builds a new comment model instance and saves it
       Comment.create({
               comment_text: req.body.comment_text,
               post_id: req.body.post_id,
               user_id: req.session.user_id,
           })
           .then(commentData => res.json(commentData))
           .catch(err => {
               console.log(err);
               res.status(400).json(err);
           })
   }
});

// If a user wants to update a comment, they must be logged in
router.put('/:id', withAuth, (req, res) => {
   Comment.update({
       comment_text: req.body.comment_text
   }, {
       where: {
           id: req.params.id
       }
   }).then(commentData => {
       if (!commentData) {
           res.status(404).json({ message: 'No comment found with this id' });
           return;
       }
       res.json(commentData);
   }).catch(err => {
       console.log(err);
       res.status(500).json(err);
   });
});

// To delete a comment, click on button associated with the comment id
router.delete('/:id', withAuth, (req, res) => {
   Comment.destroy({
       where: {
           id: req.params.id
       }
   }).then(commentData => {
       if (!commentData) {
           res.status(404).json({ message: 'No comment found with this id' });
           return;
       }
       res.json(commentData);
   }).catch(err => {
       console.log(err);
       res.status(500).json(err);
   });
});
module.exports = router;