import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';


export const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'uploads/post', // Đặt tên thư mục muốn lưu trữ trên Cloudinary
            format: 'jpg', // Định dạng tệp (jpg, png, etc.)
            public_id: file.originalname.split('.')[0], // Tên tệp trên Cloudinary
            resource_type: 'image', // Loại resource (image, video, raw, etc.)
        };
    },
});



