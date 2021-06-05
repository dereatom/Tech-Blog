const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
   Post.findAll({
      where: {
         user_id: req.session.user_id
      },
      attributes: [
         'id',
         'title',
         'content',
         'created_at' 
      ],
      include: [
         {
            model: Comment,
            attributes: [
               'id',
               'comment_text',
               'post_id',
               'user_id',
               'created_at'
            ],
            include: {
               model: User,
               attributes: ['username']
            }
         },
         {
            model: User,
            attributes: ['username']
         }
      ]
   }).then(postData => {
         const posts = postData.map(post => post.get({ plain: true }));
         res.render('dashboard', { posts, loggedIn: true });

      }).catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

router.get('/edit/:id', withAuth, (req, res) => {
   Post.findOne({
      where: {
         user_id: req.session.user_id
      },
      attributes: [
         'id',
         'title',
         'content',
         'created_at'
      ],
      include: [
         {
            model: Comment,
            attributes: [
               'id',
               'comment_text',
               'post_id',
               'user_id',
               'created_at'
            ],
            include: {
               model: User,
               attributes: ['username']
            }
         },
         {
            model: User,
            attributes: ['username']
         }
      ]
   }).then(postData => {
         const post = postData.get({ plain: true });
         res.render('edit-post', { post, loggedIn: true });
      }).catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});
//  when a user clicks /new to add a post, render that page
router.get('/new', (req, res) => {
   res.render('add-post');
});

module.exports = router;