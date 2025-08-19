import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { Brand } from "./brand.service";
import { BrandService } from "./brand.service";

@Controller('brands.service')
export class BrandController {
  constructor(private service: BrandService) {}

  @Get()
  findAll(): Promise<Brand[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Brand> {
    const found = await this.service.findById(id);
    if (!found) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }
    return found;
  }

  @Post()
  create(@Body() brand.service: Brand): Promise<Brand> {
    return this.service.save(brand.service);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() brand.service: Brand
  ): Promise<Brand> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }

    brand.service.id = id;
    return this.service.save(brand.service);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }

    await this.service.remove(id);
  }
}
