const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../Utils/auth');

router.get('/', (req, res) => {
   Comment.findAll({})
      .then(commentData => res.json(commentData))
      .catch(err => {
         console.log(err);
         res.status(400).json(err);
      });
});

router.get('/:id', (req, res) => {
   Comment.findAll({
      where: {
         post_id: req.params.id
      }
   }).then(commentData => res.json(commentData))
      .catch(err => {
         console.log(err);
         res.status(400).json(err);
      });
});


router.post('/', (req, res) => {
   // check the session
   if (req.session) {
     Comment.create({
       comment_text: req.body.comment_text,
       post_id: req.body.post_id,
       // use the id from the session
       user_id: req.session.user_id
     }).then(commentData => res.json(commentData))
       .catch(err => {
         console.log(err);
         res.status(400).json(err);
       });
   }
 });
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

router.delete('/:id', (req, res) => {
   Comment.destroy(
      {
         where: {
            id: req.params.id
         }
   }).then(commentData => {
         if(!commentData) {
            res.status(404).json({ message: 'No comment data found with this id' });
            return;
         }
         res.json(commentData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

module.exports = router;