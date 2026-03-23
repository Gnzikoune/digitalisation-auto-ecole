import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Response } from 'express';

@Controller('modules/files')
export class FilesController {
  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: any) {
    return {
      originalname: file.originalname,
      filename: file.filename,
      url: `/uploads/${file.filename}`, 
    };
  }

  @Get(':filename')
  serveFile(@Param('filename') filename: string, @Res() res: Response) {
    res.sendFile(filename, { root: './uploads' });
  }
}
