const UserRouter = require('express').Router();

UserRouter.use('/settings', require('./settings'));
UserRouter.use('/new', require('./new'));
UserRouter.use('/', require('./basics'));

module.exports = UserRouter;