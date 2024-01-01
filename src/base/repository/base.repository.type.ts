/* eslint-disable @typescript-eslint/ban-types */

type FindOptionsOrderValue = 'ASC' | 'DESC';

type FindOptionsOrderProperty<Property> = Property extends Promise<infer I>
  ? FindOptionsOrderProperty<NonNullable<I>>
  : Property extends (infer I)[]
    ? FindOptionsOrderProperty<NonNullable<I>>
    : Property extends Function
      ? never
      : Property extends string
        ? FindOptionsOrderValue
        : Property extends number
          ? FindOptionsOrderValue
          : Property extends boolean
            ? FindOptionsOrderValue
            : Property extends Buffer
              ? FindOptionsOrderValue
              : Property extends Date
                ? FindOptionsOrderValue
                : Property extends object
                  ? FindOptionsOrder<Property> | FindOptionsOrderValue
                  : FindOptionsOrderValue;

type FindOptionsOrder<Entity> = {
  [P in keyof Entity]?: P extends 'toString'
    ? unknown
    : FindOptionsOrderProperty<NonNullable<Entity[P]>>;
};

type FindOptionsRelationsProperty<Property> = Property extends Promise<infer I>
  ? FindOptionsRelationsProperty<NonNullable<I>> | boolean
  : Property extends (infer I)[]
    ? FindOptionsRelationsProperty<NonNullable<I>> | boolean
    : Property extends string
      ? never
      : Property extends number
        ? never
        : Property extends boolean
          ? never
          : Property extends Function
            ? never
            : Property extends Buffer
              ? never
              : Property extends Date
                ? never
                : Property extends object
                  ? FindOptionsRelations<Property> | boolean
                  : boolean;

type FindOptionsRelations<Entity> = {
  [P in keyof Entity]?: P extends 'toString'
    ? unknown
    : FindOptionsRelationsProperty<NonNullable<Entity[P]>>;
};

export type FindOptionsWhereProperty<
  PropertyToBeNarrowed,
  Property = PropertyToBeNarrowed,
> = PropertyToBeNarrowed extends Promise<infer I>
  ? FindOptionsWhereProperty<NonNullable<I>>
  : PropertyToBeNarrowed extends Array<infer I>
    ? FindOptionsWhereProperty<NonNullable<I>>
    : PropertyToBeNarrowed extends Function
      ? never
      : PropertyToBeNarrowed extends Buffer
        ? Property
        : PropertyToBeNarrowed extends Date
          ? Property
          : PropertyToBeNarrowed extends string
            ? Property
            : PropertyToBeNarrowed extends number
              ? Property
              : PropertyToBeNarrowed extends boolean
                ? Property
                : PropertyToBeNarrowed extends object
                  ?
                      | FindOptionsWhere<Property>
                      | FindOptionsWhere<Property>[]
                      | boolean
                  : Property;

export type FindOptionsWhere<Entity> = {
  [P in keyof Entity]?: P extends 'toString'
    ? unknown
    : FindOptionsWhereProperty<NonNullable<Entity[P]>>;
};

type FindOptionsSelectProperty<Property> = Property extends Promise<infer I>
  ? FindOptionsSelectProperty<I> | boolean
  : Property extends (infer I)[]
    ? FindOptionsSelectProperty<I> | boolean
    : Property extends string
      ? boolean
      : Property extends number
        ? boolean
        : Property extends boolean
          ? boolean
          : Property extends Function
            ? never
            : Property extends Buffer
              ? boolean
              : Property extends Date
                ? boolean
                : Property extends object
                  ? FindOptionsSelect<Property>
                  : boolean;

type FindOptionsSelect<Entity> = {
  [P in keyof Entity]?: P extends 'toString'
    ? unknown
    : FindOptionsSelectProperty<NonNullable<Entity[P]>>;
};

export interface FindOneOptions<Entity> {
  relations?: FindOptionsRelations<Entity>;
  select?: FindOptionsSelect<Entity>;
  where?: FindOptionsWhere<Entity>;
}

export interface FindManyOptions<Entity> {
  order?: FindOptionsOrder<Entity>;
  relations?: FindOptionsRelations<Entity>;
  select?: FindOptionsSelect<Entity>;
  skip?: number;
  take?: number;
  where?: FindOptionsWhere<Entity>;
}

export type DeepPartial<T> =
  | T
  | (T extends (infer U)[]
      ? DeepPartial<U>[]
      : T extends Map<infer K, infer V>
        ? Map<DeepPartial<K>, DeepPartial<V>>
        : T extends Set<infer M>
          ? Set<DeepPartial<M>>
          : T extends object
            ? {
                [K in keyof T]?: DeepPartial<T[K]>;
              }
            : T);

export type QueryDeepPartialEntity<T> = {
  [P in keyof T]?:
    | (T[P] extends (infer U)[]
        ? QueryDeepPartialEntity<U>[]
        : T[P] extends ReadonlyArray<infer U>
          ? ReadonlyArray<QueryDeepPartialEntity<U>>
          : QueryDeepPartialEntity<T[P]>)
    | (() => string);
};
