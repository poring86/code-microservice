/* eslint-disable @typescript-eslint/no-namespace */
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from '@fc/micro-videos/category/application';
import { CategoryInMemoryRepository, CategorySequelize } from '@fc/micro-videos/category/infra';
import CategoryRepository from '@fc/micro-videos/dist/category/domain/repository/category.repository';
import { getModelToken } from '@nestjs/sequelize';

export namespace CATEGORY_PROVIDERS {
  export namespace REPOSITORIES {
    export const CATEGORY_IN_MEMORY_REPOSITORY = {
      provide: 'CategoryInMemoryRepository',
      useClass: CategoryInMemoryRepository,
    };

    export const CATEGORY_SEQUELIZE_REPOSITORY = {
      provide: 'CategorySequelizeRepository',
      useFactory: (categoryModel: typeof CategorySequelize.CategoryModel) => {
        return new CategorySequelize.CategoryRepository(categoryModel)
      },
      inject: [getModelToken(CategorySequelize.CategoryModel)]
    };
  }


  export namespace USE_CASES {
    export const CREATE_CATEGORY_USE_CASE = {
      provide: CreateCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new CreateCategoryUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY_REPOSITORY.provide],
    };

    export const UPDATE_CATEGORY_USE_CASE = {
      provide: UpdateCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new UpdateCategoryUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY_REPOSITORY.provide],
    };

    export const LIST_CATEGORIES_USE_CASE = {
      provide: ListCategoriesUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new ListCategoriesUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY_REPOSITORY.provide],
    };

    export const GET_CATEGORY_USE_CASE = {
      provide: GetCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new GetCategoryUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY_REPOSITORY.provide],
    };

    export const DELETE_CATEGORY_USE_CASE = {
      provide: DeleteCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new DeleteCategoryUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY_REPOSITORY.provide],
    };
  }
}
