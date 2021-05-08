module.exports = function (req, res, next) { 
    if(!req.user.isAdmin) res.status(403).send('Access denied.');
    next();
}
// 400 bad request
// 401 unauthorized
// 403 forbidden
// 404 not found