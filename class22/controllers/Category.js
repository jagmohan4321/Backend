const Category = require("../modals/Category.js");
const User = require("../modals/User.js");
exports.CreateCategory = async (req, res) => {
    try {

        // get the data from the body 
        const { categoryName, categoryDiscription } = req.body;
        // data ko validate kar lumnga
        if (categoryName === '' || categoryDiscription === "") {
            return res.status(400).json({
                message: "You have to fill all the data values",
                success: false,

            })
        }
        // Create  Category 
        const categorytData = await Category.create({ categoryName, categoryDiscription });

        //put kardo category id ko user collection ke andar jis user ne banai hai vo khud kee created category dekh sake

        //get the user id from req object
        const id = req.info.id;
        await User.findByIdAndUpdate({ _id: id }, { $push: { category: categorytData._id } });

        return res.status(201).json({
            message: `Category Create Successfully`,
            success: true,
            data: categorytData
        })


    }
    catch (error) {
        console.log("error in  create Categry Controller ", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,

        })
    }

}

exports.DeleteCategory = async (req, res) => {
    try {

        // get the data from the body 
        const { categoryId } = req.body;
        // data ko validate kar lumnga
        if (categoryId === '') {
            return res.status(400).json({
                message: "You have to fill all the data values",
                success: false,

            })
        }
        // Create  Category 
        const categorytData = await Category.findById({ _id: categoryId });
        if (!categoryId) {
            return res.status(404).json({
                message: `No Category Found,with this categoryId ${categoryId}`,
                success: false
            })
        }

        //put kardo category id ko user collection ke andar jis user ne banai hai vo khud kee created category dekh sake

        //get the user id from req object
        const id = req.info.id;

        //so you to remove category from user schema first
        await User.findByIdAndUpdate({ _id: id }, { $pop: { category: categoryId } });

        // you have to delete the category from the category schema
        await Category.findByIdAndDelete({ _id: categoryId });


        return res.status(201).json({
            message: `Category Create Successfully`,
            success: true,
            data: categorytData
        })


    }
    catch (error) {
        console.log("error in  create Product Controller ", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,

        })
    }

}