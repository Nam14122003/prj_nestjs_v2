"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
exports.storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: async (req, file) => {
        return {
            folder: 'uploads/post',
            format: 'jpg',
            public_id: file.originalname.split('.')[0],
            resource_type: 'image',
        };
    },
});
//# sourceMappingURL=cloudinary.multer.js.map