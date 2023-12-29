import {
  FindOneOptions,
  FindManyOptions,
  FindOptionsWhere,
  DeepPartial,
  QueryDeepPartialEntity,
} from './base.repository.type';

export abstract class BaseRepository<Entity> {
  abstract findOne(options?: FindOneOptions<Entity>): Promise<Entity | null>;
  abstract findOneOrThrow(options: FindOneOptions<Entity>): Promise<Entity>;
  abstract findMany(options?: FindManyOptions<Entity>): Promise<Entity[]>;
  abstract create(data: DeepPartial<Entity>): Promise<Entity>;
  abstract update(
    criteria: FindOptionsWhere<Entity>,
    data: QueryDeepPartialEntity<Entity>,
  ): Promise<void>;
  abstract delete(criteria: FindOptionsWhere<Entity>): Promise<void>;
  abstract count(criteria?: FindManyOptions<Entity>): Promise<number>;
}
