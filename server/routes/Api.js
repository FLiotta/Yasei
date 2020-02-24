const apiRouter = require('express').Router();

apiRouter.use('/auth', require('./Auth'));
apiRouter.use('/user', require('./user'));
apiRouter.use('/discover', require('./Discover'));
apiRouter.use('/post', require('./Post'));

module.exports = apiRouter;