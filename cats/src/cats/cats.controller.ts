import {
  Controller,
  UseGuards,
  UseInterceptors,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  Header,
} from '@nestjs/common';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';
import { LoggingInterceptor } from '../common/logging.interceptor';
import { ParseIntPipe } from '../common/parse-int';
import { User } from '../common/user.decorator';
import { CatsService } from './cats.service';
import { CatDto } from './cats.dto';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  getAll(@User('firstName') firstName: string) {
    console.log(firstName);
    return this.catsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number, @User() user: any) {
    console.log(user);
    return this.catsService.getOne(id);
  }

  @Post()
  @Roles(['admin'])
  @Header('Cache-control', 'no-store')
  create(@Body() createCatDto: CatDto) {
    return this.catsService.create(createCatDto);
  }

  @Put(':id')
  @Roles(['admin'])
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCatDto: CatDto) {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.remove(id);
  }
}
