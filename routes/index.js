const router = require("express").Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes)

router.use((req,res) => {
    res.status(404).json({Message:'This route is not asssociated with us'})
})

module.exports = Router;