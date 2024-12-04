'use strict'

//TODO:
let treeData = {id:1, status:"None"};

function getHanlder(req, res) {
    res.json({
    data: treeData
  })
}

function postHandler(req, res) {
    req.json().then((body)=>{
        treeData = body;
    })
    res.json({
        success: true
  })
}
module.exports = {getHanlder, postHandler}
