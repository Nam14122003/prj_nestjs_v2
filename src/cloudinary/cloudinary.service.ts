import { Injectable, Inject } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    async uploadImage(file: Express.Multer.File): Promise<any> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: 'uploads' }, (error, result) => {
                // if (error) return reject(error);
                resolve(result);
            }).end(file.buffer);
        });
    }
}
