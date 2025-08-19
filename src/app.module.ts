import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { CategoryModule } from "./cases/categories/category.module";
import { BrandModule } from "./cases/brands/brand.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-sa-east-1.pooler.supabase.com',
      port: 5432,
      username: 'postgres.lkpkhojlhaexjhvnkpqp',
      password: 'Kalunga82?',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CategoryModule,
    BrandModule
  ],
})
export class AppModule {}
