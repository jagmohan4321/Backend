const Product = require("../modals/Product.js");
const uploadImage = require("../utils/UploadFiles.js");
exports.CreateProduct = async (req, res) => {
    try {

        // get the data from the body 
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
        const urlImage = await uploadImage(productImage?.tempFilePath)
        const productData = await Product.create({ productName, pDiscription, pPrice, pImage: urlImage.secure_url });
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