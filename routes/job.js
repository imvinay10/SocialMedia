const app = require('express');
const router = app.Router();

router.get('/',(req,res) => {
    res.send('Jobs Reached').status(200);
});

module.exports = router;
