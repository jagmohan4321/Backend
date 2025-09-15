
const Category = require("../modals/Category.js")


exports.createCategory = async (req, res) => {
    try {
        //get the data from the body
        const { categoryName, categoryDiscription } = req.body;


        //Validate
        if (categoryName === "" && categoryDiscription) {
            res.status(400).json({
                message: "Data cant be empty",
                success: false
            })
        }

        //Category ko create kar deaya 
        const newCategory = await Category.create({ categoryName, categoryDiscription })
        res.status(400).json({
            message: "Category Created ",
            success: true,
            data: newCategory
        })
    }
    catch (err) {
        console.log("Gettign an error in create category controller");

        res.status(400).json({
            error: err.message,
            success: false,
            message: "Internal server error "
        })
    }
}


exports.allCategory = async (req, res) => {
    try {
        //Category ko create kar deaya 
        const allCategory = await Category.find().populate("product");
        console.log(allCategory);

        res.status(400).json({
            message: "All Category ",
            success: true,
            data: allCategory
        })
    }
    catch (err) {
        console.log("Gettign an error in All category controller");

        res.status(400).json({
            error: err.message,
            success: false,
            message: "Internal server error "
        })
    }
}


exports.SingleCategory = async (req, res) => {
    try {

        const cid = req.params.cid;

        if (!cid) {
            res.status(400).json({
                message: "Data cant be empty",
                success: false
            })
        }
        const isCategoryExist = await Category.findById({ _id: cid });
        if (!isCategoryExist) {
            res.status(400).json({
                message: "Category Not exist ",
                success: false,

            })
        }

        //Category ko create kar deaya 
        const SingleCategory = await Category.findById({ _id: cid }).populate("product");
        res.status(400).json({
            message: "Single Category ",
            success: true,
            data: SingleCategory
        })
    }
    catch (err) {
        console.log("Gettign an error in All category controller");

        res.status(400).json({
            error: err.message,
            success: false,
            message: "Internal server error "
        })
    }
}


exports.deleteCategory = async (req, res) => {
    try {
        //get the data from the body
        const { id } = req.params;


        //Validate
        if (!id) {
            res.status(400).json({
                message: "Data cant be empty",
                success: false
            })
        }

        const isCategoryExist = await Category.findById({ _id: id });
        if (!isCategoryExist) {
            res.status(400).json({
                message: "Category Not exist ",
                success: false,

            })
        }

        //Category ko create kar deaya 
        await Category.findByIdAndDelete({ _id: id })
        return res.status(200).json({
            message: "Category Deleted ",
            success: true,

        })
    }
    catch (err) {
        console.log("Gettign an error in delete category controller");

        res.status(400).json({
            error: err.message,
            success: false,
            message: "Internal server error "
        })
    }
}