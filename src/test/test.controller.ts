import { Controller, Get, Param } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private service: TestService) {}

  @Get()
  exibir() {
    return this.service.exibir();
  }

  @Get(':id')
  exbirParam(@Param('id') id) {
    return id;
  }
}
