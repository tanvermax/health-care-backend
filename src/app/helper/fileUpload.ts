
import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import config from "../../config";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), "/uploads"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })



const uploadTocloudinary = async (file: Express.Multer.File) => {
    console.log("file", file)
    // Configuration
    cloudinary.config({
        cloud_name: config.cloudinary.cloude_name,
        api_key: config.cloudinary.api_key,
        api_secret: config.cloudinary.api_secret
    })
    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
            file.path, {
            public_id: file.filename,
        }
        )
        .catch((error) => {
            console.log(error);
        });

    // console.log("uploadResult",uploadResult);
    return uploadResult
}




// (async function() {



//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });

//     console.log(optimizeUrl);

//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });

//     console.log(autoCropUrl);    
// })();

export const fileUploade = {
    upload, uploadTocloudinary
}