import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from "@nestjs/common";
import { Product } from "../products/product.entity";
import { ProductService } from "../products/product.service";
import { CategoryService } from "../categories/category.service";

@Controller('products')
export class ProductController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly service: ProductService
  ) {}

  @Get()
  async findAll(@Query('categoryId', ParseUUIDPipe) categoryId?: string): Promise<Product[]> {
    if (categoryId) {
      const category = await this.categoryService.findById(categoryId);
      return this.service.findAll(category);
    }

    return this.service.findAll();
  }
  

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    const found = await this.service.findById(id);
    if (!found) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return found;
  }

  @Post()
  create(@Body() product: Product): Promise<Product> {
    return this.service.save(product);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: Product
  ): Promise<Product> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    product.id = id;
    return this.service.save(product);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    await this.service.remove(id);
  }
}
