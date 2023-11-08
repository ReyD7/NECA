module.exports = function (req, res, next) {
    console.log(req.user);
     if (!req.user) {
         let err = new Error('You are not authenticated!');
         err.status = 403;
         return next(err);
     } else {
         next();
     }
}