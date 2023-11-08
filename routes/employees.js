var express = require('express');
var employees = require('../models/Employee');
var router = express.Router();

router.route('/')
    .get((req, res, next) => {
        employees.find({})
            .then((employees) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(employees);
            }, (err) => next(err))
            .catch((err) => next(err));
    }) 
  
    .post((req, res, next) => {
        employees.create(req.body)
            .then((Employee) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Employee);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported!');
    })
    
    .delete((req, res, next) => {
        employees.deleteMany({})
            .then((reply) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(reply);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
    
    router.route('/:id')
    .get((req, res, next) => {
        employees.findById(req.params.id)
            .then((Employee) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Employee);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation not supported!");
    })
    .put((req, res, next) => {
        employees.findByIdAndUpdate(req.params.id,
             { $set: req.body }, 
             { new: true, useFindAndModify: false })
            .then((Employee) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Employee);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        employees.findByIdAndDelete(req.params.id)
            .then((Employee) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Employee);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
    
module.exports = router;