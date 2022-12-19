import { Controller, Get, NotFoundException } from '@nestjs/common';


@Controller()
export class AppController {

  @Get()
  home(): string {
    throw new NotFoundException();
  }
}
