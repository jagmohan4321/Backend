const express=require("express");
const router=express.Router();
const InsertStudentController=require("../controllers/InsertStudentController.js");
router.post("/create-student",InsertStudentController);
module.exports=router;