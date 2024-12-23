import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { GeneratePngDto, GeneratePostDto } from './dto/create-post.dto';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('generate-post')
export class PostController {
  constructor(private readonly PostService: PostService) {}
  
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  generatePost(@Body() generatePostDto: GeneratePostDto): { content: string } {
    const { htmlTemplate, quote } = generatePostDto;
    const content = this.PostService.generatePost(htmlTemplate, quote);
    return { content };
  }
  @Get('convert-to-png')
  @UsePipes(new ValidationPipe({ transform: true }))
  async convertToPng(@Res() res: Response): Promise<void> {
    const content = `<!DOCTYPE html> <html lang=\"en\"> <head> <meta charset=\"UTF-8\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> <title>LinkedIn Post</title> <style> body { margin: 0; font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #052431; } .container { display: flex; justify-content: center; align-items: center; width: 1000px; height: 1000px; background-color: #052431; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden; padding: 24px; box-sizing: border-box; } .content { display: flex; flex-direction: column; } .profile { display: flex; justify-content: center; align-items: center; margin-bottom: 64px; } .profile img { height: 144px; width: 144px; object-fit: cover; border-radius: 50%; border: 2px solid white; } .profile-details { margin-left: 20px; } .profile-details .name { color: white; font-weight: bold; font-size: 40px; margin-top: 12px; } .profile-details .tagline { color: #A0AEC0; font-size: 24px; margin-bottom: 16px; } .quote { display: flex; flex-grow: 1; flex-direction: column; justify-content: center; text-align: center; } .quote-text { color: white; width: 500px; word-break: break-word; font-size: 40px; line-height: 1.5; margin: 0 auto; } </style> </head> <body> <div class=\"container\"> <div class=\"content\"> <div class=\"profile\"> <img src=\"https://media.licdn.com/dms/image/v2/D4E03AQE3WpirQLWcwA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728316490982?e=1740009600&v=beta&t=FGFjKsheaOaiXoLOGA2-eVQ5gSA9O9aqiQSewM87CEY\" alt=\"Profile Picture\"> <div class=\"profile-details\"> <div class=\"name\">Muqeet Mughal</div> <div class=\"tagline\">Tailored ERP & Software Solutions</div> </div> </div> <div class=\"quote\"> <div class=\"quote-text\"> This is a test quote. </div> </div> </div> </div> </body> </html>`
    const outputPath = 'output.png';

    if (!content) {
      throw new BadRequestException('HTML content must be provided.');
    }

    await this.PostService.convertHtmlToPng(content, outputPath);
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(outputPath, { root: '.' }, () => {
      fs.unlinkSync(outputPath); // Remove the file after sending it
    });
  }
  // @Post('convert-to-png')
  // @UsePipes(new ValidationPipe({ transform: true }))
  // async convertToPng(@Body() generatePngDto: GeneratePngDto, @Res() res: Response): Promise<void> {
  //   const { content } = generatePngDto;
  //   const outputPath = 'output.png';

  //   if (!content) {
  //     throw new BadRequestException('HTML content must be provided.');
  //   }

  //   await this.PostService.convertHtmlToPng(content, outputPath);
  //   res.setHeader('Content-Type', 'image/png');
  //   res.sendFile(outputPath, { root: '.' }, () => {
  //     fs.unlinkSync(outputPath); // Remove the file after sending it
  //   });
  // }


}
