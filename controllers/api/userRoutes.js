const router = require('express').Router();
const { Comment, User, Post} = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
   // Access our User model and run .findAll() method
   User.findAll({
      attributes: { exclude: ['password'] }

   }).then(userData => res.json(userData))
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
   User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      },
      include: [
         {
            model: Post,
            attributes: ['id', 'title', 'content', 'created_at']
         },
         // include the Comment model here:
         {
            model: Comment,
            attributes: ['id', 'comment_text', 'created_at'],
            include: {
               model: Post,
               attributes: ['title']
            }
         }
      ]
    }).then(userData => {
         if (!userData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
         }
         res.json(userData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// POST /api/users
router.post('/', (req, res) => {
   
   User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
   }).then(userData => {
         req.session.save(() => {
         req.session.user_id =userData.id;
         req.session.username = userData.username;
         req.session.loggedIn = true;
      
         res.json(userData);
         });
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

router.post('/login', (req, res) => {
   User.findOne({
     where: {
       email: req.body.email
     }
   }).then(userData => {
     if (!userData) {
       res.status(400).json({ message: 'No user with that email address!' });
       return;
     }
 
     const validPassword = userData.checkPassword(req.body.password);
 
     if (!validPassword) {
       res.status(400).json({ message: 'Incorrect password!' });
       return;
     }
 
     req.session.save(() => {
       // declare session variables
       req.session.user_id = userData.id;
       req.session.username = userData.username;
       req.session.logged_in = true;
 
       res.json({ user: userData, message: 'You are now logged in!' });
     });
   }).catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
 });

//  allow users to log out
 router.post('/logout', (req, res) => {
   if (req.body.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }else {
      res.status(404).end();
    }
});
// router.put('/:id', (req, res) => {
//    User.update(req.body, {
//       individualHooks: true,
//       where: {
//          id: req.params.id
//       }
//    }).then(userData => {
//          if (!userData[0]) {
//             res.status(404).json({ message: 'No user found with this id '});
//             return;
//          }
//          res.json(userData);
//       })
//       .catch(err => {
//          console.log(err);
//          res.status(500).json(err);
//       });
// });

// // DELETE /api/users/1
// router.delete('/:id', (req, res) => {
//    User.destroy({
//       where: {
//          id: req.params.id
//       }

//    }).then(userData => {
//          if (!userData) {
//             res.status(404).json({ message: 'No user found with this id' });
//             return;
//          }
//          res.json(userData);
//       })
//       .catch(err => {
//          console.log(err);
//          res.status(500).json(err);
//       });
// });

module.exports = router;