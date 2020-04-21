var path = require("path");
var fs = require("fs");
const router=require("express").Router()

router.get("/", function (req, res){
    res.sendFile(path.join(__dirname,"../public/index.html"))
    })

    
module.exports = router