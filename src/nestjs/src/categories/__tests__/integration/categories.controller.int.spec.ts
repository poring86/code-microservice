
import { Test, TestingModule } from "@nestjs/testing"
import { CategoriesController } from "nestjs/src/categories/categories.controller"
import { CategoriesModule } from "nestjs/src/categories/categories.module"
import { DatabaseModule } from "nestjs/src/database/database.module"
import { ConfigModule } from "nestjs/src/config/config.module"
import { CreateCategoryUseCase, UpdateCategoryUseCase, ListCategoriesUseCase, DeleteCategoryUseCase } from "@fc/micro-videos/category/application"
import CategoryRepository from "@fc/micro-videos/dist/category/domain/repository/category.repository"
import { CATEGORY_PROVIDERS } from "nestjs/src/categories/category.providers"
import entity from "@fc/micro-videos/dist/@seedwork/domain/entity/entity"

describe('CategoriesController Integration Tests', () => {
  let controller: CategoriesController
  let repository: CategoryRepository.Repository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule, CategoriesModule],
    }).compile();

    controller = module.get(CategoriesController)
    repository = module.get(
      CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
    expect(controller['createUseCase']).toBeInstanceOf(CreateCategoryUseCase.UseCase)
    expect(controller['updateUseCase']).toBeInstanceOf(UpdateCategoryUseCase.UseCase)
    expect(controller['listUseCase']).toBeInstanceOf(ListCategoriesUseCase.UseCase)
    expect(controller['deleteUseCase']).toBeInstanceOf(DeleteCategoryUseCase.UseCase)
  })

  it('should create a category', async () => {
    const output = await controller.create({
      name: 'Movie'
    })
    const entity = await repository.findById(output.id)

    expect(entity).toMatchObject({
      id: output.id,
      name: 'Movie',
      description: null,
      is_active: true,
      created_at: output.created_at
    })

    console.log('output', output)
    expect(output.name).toBe('Movie')
    expect(output.description).toBeNull()
    expect(output.is_active).toBeTruthy()
    expect(output.created_at).toStrictEqual(entity.created_at)
  })
})