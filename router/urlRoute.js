const express = require("express");
const router= express.Router();
const urlController = require("../Controller/urlController");

router.get("/" , urlController.geturl)

router.get("/url" , urlController.geturl)

router.post("/url",urlController.generateShortId);

router.get("/:shortid",urlController.redirectOrVisiturl)

router.get("/count/:shortid",urlController.countVisit)

module.exports=router;