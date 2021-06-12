  
const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
   console.log(req.session);

   Post.findAll({
      attributes: [
         'id',
         'title',
         'content',
         'created_at',
      ],
      include: [
         {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
         console.log(postData[0]);
         const posts = postData.map(post => post.get({ plain: true }));
         res.render('homepage', { 
            posts,loggedIn: req.session.loggedIn});
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

router.get('/login', (req, res) => {
   if (req.session.loggedIn) {
     res.redirect('/');
     return;
   }
 
   res.render('login');
});

router.get('/signup', (req, res) => {
   res.render('signup');
});

router.get('/post/:id', (req, res) => {
   Post.findOne({
     where: {
       id: req.params.id
     },
     attributes: [
       'id',
       'title',
       'content',
       'created_at',
     ],
     include: [
       {
         model: Comment,
         attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
   }).then(PostData => {
       if (!PostData) {
         res.status(404).json({ message: 'No post found with this id' });
         return;
       }
 
       const post = PostData.get({ plain: true });
       res.render('single-post', { 
          post, loggedIn: req.session.loggedIn});
         
     }).catch(err => {
       console.log(err);
       res.status(500).json(err);
     });
});
router.post('/logout', (req, res) => {
//  console.log(`\n Logged in: ${req.session.logged_in}  \n`);
   
   if (req.session.loggedIn) {
       res.redirect('/login');
   }
   res.render('dashboard');
});
module.exports = router;