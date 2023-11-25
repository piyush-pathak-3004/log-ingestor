var express = require('express');
var router = express.Router();

const writeController = require('../controllers/writeController');
const readController = require("../controllers/readController")


router.post('/insert',(req, res)=>{
    console.log("inside routes...");
    writeController.insertLog(req, res);
});
router.get('/query', (req, res) => {
    console.log("inside query route...");
    readController.queryLogs(req, res);
});

module.exports = router;