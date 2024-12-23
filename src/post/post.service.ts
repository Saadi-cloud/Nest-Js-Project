import * as Handlebars from 'handlebars';
import puppeteer from 'puppeteer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  generatePost(htmlTemplate: string, quote: string): string {
    const template = Handlebars.compile(htmlTemplate);
    const context = { quote };
    return template(context);
  }

  
  async convertHtmlToPng(htmlContent: string, outputPath: string): Promise<void> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    await page.setViewport({ width: 1000, height: 1000 }); // Adjust the viewport based on your HTML content
    await page.screenshot({ path: outputPath, fullPage: true });
    await browser.close();
  }

}
