import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  private files = [];

  saveFile(file: Express.Multer.File) {
    const meta = {
      name: file.filename,
      originalName: file.originalname,
      size: file.size,
      mime: file.mimetype,
      url: `http://localhost:3000/files/${file.filename}`,
    };

    this.files.push(meta);
    return meta;
  }

  getAll() {
    return this.files;
  }
}
