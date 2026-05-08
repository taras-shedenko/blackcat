import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFileAndPassValidation(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'jpeg' })
        .addMaxSizeValidator({ maxSize: 1000 })
        .build({
          fileIsRequired: false,
        }),
    )
    file: any,
  ) {
    return { file: file.buffuer.toString() };
  }
}
