import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found.error";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import { InMemoryRepository } from "./in-memory.repository";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository Unit Tests", () => {
  let repository: StubInMemoryRepository;
  beforeEach(() => (repository = new StubInMemoryRepository()));
  it("should inserts a new entity", async () => {
    const repository = new StubInMemoryRepository();
    const entity = new StubEntity({ name: "Name value", price: 5 });
    await repository.insert(entity);
    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throws error when entity not found", () => {
    expect(repository.findById("fake id")).rejects.toThrow(
      new NotFoundError("Entity Not Found using ID fake id")
    );

    expect(
      repository.findById(
        new UniqueEntityId("6f1a1668-967c-424a-ab06-e0a627909339")
      )
    ).rejects.toThrow(
      new NotFoundError(
        "Entity Not Found using ID 6f1a1668-967c-424a-ab06-e0a627909339"
      )
    );
  });

  it("should find a entity by id", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.uniqueEntityId);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity.uniqueEntityId);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it("should returns all entities", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    const entities = await repository.findAll();

    expect(entities).toStrictEqual([entity]);
  });

  it("should throws error on update when entity not found", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${entity.id}`)
    );
  });

  it("should updates an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    const entityUpdated = new StubEntity(
      { name: "updated", price: 1 },
      entity.uniqueEntityId
    );
    await repository.update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throws error on delete when entity not found", async () => {
    expect(repository.delete("fake id")).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );

    expect(
      repository.delete(
        new UniqueEntityId(`6f1a1668-967c-424a-ab06-e0a627909339`)
      )
    ).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID 6f1a1668-967c-424a-ab06-e0a627909339`
      )
    );
  });

  it("should deletes an entity", async () => {
    let entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);

    await repository.insert(entity);

    await repository.delete(entity.uniqueEntityId);
    expect(repository.items).toHaveLength(0);
  });
});
