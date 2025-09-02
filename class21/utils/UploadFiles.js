const clodinary = require("cloudinary").v2;
require("dotenv").config();

clodinary.config({
    cloud_name: process.env.CLOUDNAME_CLOUDINARY,
    api_key: process.env.APIKEY_CLOUDINARY,
    api_secret: process.env.APISECRET_CLOUDINARY
})

async function uploadImage(files) {
    try {
        console.log("We are in the cloudinary", files);
        const asn=await clodinary.uploader.upload(files)
        // console.log(asn);
        return asn;
    }
    catch (err) {
        console.log("error in cloudinary upload file function", err);
    }
}
module.exports = uploadImage;