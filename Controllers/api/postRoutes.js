const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Comment, Post, User, Vote } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id', 
      'post_url', 
      'title', 
      'created_at',
      [
        sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
        'vote_count'
      ]
    ],
    order: [['created_at', 'DESC']],
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
  }).then(postData => res.json(postData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
 });

// get one record
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id', 
      'post_url', 
      'title', 
      'created_at',
      [
        sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
        'vote_count'
      ]
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
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(postData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

 // create a post
 router.post('/', withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    post_url: req.body.post_url,
    user_id: req.session.user_id
  })
    .then(postData => res.json(postData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/posts/upvote
router.put('/upcomment', withAuth, (req, res) => {
  // make sure the session exists first
  if (req.session) {
    Post.update({ ...req.body, user_id: req.session.user_id }, {Comment, User })
      .then(updatedCommentData => res.json(updatedCommentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

// update a post
router.put('/:id', withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }).then(postData => {
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(postData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a post
router.delete('/:id', (req, res) => {



  Post.destroy(
    {
      where: {
        id: req.params.id
      }
  })
    .then(postData => {
      if(!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(postData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
  
module.exports = router;