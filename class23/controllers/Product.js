
const Category = require("../modals/Category.js");
const Product = require("../modals/Product.js");


exports.createProduct = async (req, res) => {
    try {
        //get the data from the body
        const { productName, pDiscription, pPrice } = req.body;


        //Validate
        if (productName === "" && pDiscription === "" && pPrice === "") {
            res.status(400).json({
                message: "Data cant be empty",
                success: false
            })
        }

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

        // const pImage=req.pImage;
        //Product ko create kar deaya 
        const newProduct = await Product.create({ productName, pDiscription, pPrice })


        //put the product id inside the category schema 
        await Category.findOneAndUpdate({ _id: cid }, { $push: { product: newProduct._id } })
        res.status(400).json({
            message: "Product Created ",
            success: true,
            data: newProduct
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



exports.deleteProduct = async (req, res) => {
    try {
        //get the data from the body
        const { pid } = req.params;
        console.log(pid);


        //Validate
        if (!pid) {
            res.status(400).json({
                message: "Data cant be empty",
                success: false
            })
        }

        const cid = req.params.cid;
        console.log(cid);
        
        if (!cid) {
            res.status(400).json({
                message: "Data cant be empty",
                success: false
            })
        }
        const isCategoryExist = await Category.findById({ _id: cid });
        if (!isCategoryExist) {
            res.status(400).json({
                message: "Product Not exist ",
                success: false,

            })
        }

        const isProductExist = await Product.findById({ _id: pid });
        if (!isProductExist) {
            res.status(400).json({
                message: "Product Not exist ",
                success: false,

            })
        }

        //Category schema se product ko hatao create kar deaya 
        await Category.findOneAndUpdate({ _id: cid }, { $pull: { product: isProductExist._id } })


        // finally delete the product
        await Product.findByIdAndDelete({ _id: pid })
        return res.status(200).json({
            message: "Product Deleted ",
            success: true,

        })
    }
    catch (err) {
        console.log("Gettign an error in delete Product controller");

        res.status(400).json({
            error: err.message,
            success: false,
            message: "Internal server error "
        })
    }
}


