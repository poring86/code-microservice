
import { Test, TestingModule } from "@nestjs/testing"
import { CategoriesController } from "nestjs/src/categories/categories.controller"
import { CategoriesModule } from "nestjs/src/categories/categories.module"
import { DatabaseModule } from "nestjs/src/database/database.module"
import { ConfigModule } from "nestjs/src/config/config.module"

describe('CategoriesController Integration Tests', () => {
  let controller: CategoriesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule, CategoriesModule],
    }).compile();

    controller = module.get(CategoriesController)
  })

  it('xpto', () => {
    console.log(controller)
  })
})