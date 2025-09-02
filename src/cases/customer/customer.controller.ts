import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { Customer } from "./customer.entity";
import { CustomerService } from "./customer.service";

@Controller('customers')
export class CustomerController {
  constructor(private service: CustomerService) {}

  @Get()
  findAll(): Promise<Customer[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Customer> {
    const found = await this.service.findById(id);
    if (!found) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    return found;
  }

  @Post()
  create(@Body() Customer: Customer): Promise<Customer> {
    return this.service.save(Customer);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() Customer: Customer
  ): Promise<Customer> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    Customer.id = id;
    return this.service.save(Customer);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    await this.service.remove(id);
  }
}
