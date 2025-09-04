const Category = require("../modals/Category.js");
const Product = require("../modals/Product.js");
const uploadImage = require("../utils/UploadFiles.js");
exports.CreateProduct = async (req, res) => {
    try {

        // get the data from the body 
        const { cid } = req.params;
        const { productName, pDiscription, pPrice } = req.body;
        // data ko validate kar lumnga
        if (productName === '' || pDiscription === "" || pPrice === "") {
            return res.status(400).json({
                message: "You have to fill all the data values",
                success: false,

            })
        }
        //Product Create 
        // const { productImage } = req.files;
        const productImage = req.files.productImage;
        console.log("images", productImage);
        // you have to create a path jha par aapko image ko rakhna hai pc h.w
        const urlImage = await uploadImage(productImage?.tempFilePath);

        //create the product first 
        const productData = await Product.create({ productName, pDiscription, pPrice, pImage: urlImage.secure_url });

        //update the category schema 
        await Category.findByIdAndUpdate({ _id: cid }, { $push: { product: productData._id } });


        return res.status(201).json({
            message: `Product Create Successfully`,
            success: true,
            data: productData
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


exports.deleteProduct = async (req, res) => {
    try {

        // get the data from the body 
        const { pid } = req.params;

        // data ko validate kar lumnga
        if (pid === '') {
            return res.status(400).json({
                message: "You have to fill all the data values",
                success: false,

            })
        }
        // you have to remove the product id 1st from the category schema
        //update the category schema 
        await Category.findByIdAndUpdate({ _id: pid }, { $pop: { product: pid } });

        //delete the product  
        await Product.findByIdAndDelete({ _id: pid });
        return res.status(201).json({
            message: `Product deleted Successfully`,
            success: true,
        })


    }
    catch (error) {
        console.log("error in  delete Product Controller ", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,

        })
    }

}