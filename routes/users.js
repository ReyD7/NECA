var express = require('express');
var User = require('../models/User');
var passport = require('passport');
var router = express.Router();

router.post('/signup', (req, res, next) => {
    User.register(new User(req.body),
      req.body.password, (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({ err: err });
        }
        else {
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Registration Successful!' });
          });
        }
      });
  });

  router.post('/login', passport.authenticate('local'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, status: 'You are successfully logged in!', usertype:req.user.admin, user: req.user._id});
  });

 router.get('/logout', (req, res, next) => {
    if(req.user){
      req.session.destroy();
      res.clearCookie('session-id');
      res.statusCode = 200;
      res.send("You are logged Out");
      res.end();
    }
    else{
      let err = new Error('You are not logged in!');
      err.status=403;
      next(err);
    }
  });

  router.get("/", (req, res) => {
    User.find(function(err, user) {
         if (err) {
             console.log(err);
         } else {
             res.json(user);
         }
     });
 });

 router.route('/:id')
    .get((req, res, next) => {
        User.findById(req.params.id)
            .then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation not supported!");
    })
    .put((req, res, next) => {
        User.findByIdAndUpdate(req.params.id,
             { $set: req.body }, 
             { new: true, useFindAndModify: false })
            .then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        User.findByIdAndDelete(req.params.id)
            .then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
  
  module.exports = router;