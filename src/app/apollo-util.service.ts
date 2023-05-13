import { Injectable } from '@angular/core';
import { cloneDeep } from '@apollo/client/utilities';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class ApolloUtilService {
  constructor(private apollo: Apollo) {}

  /**
   * Pessimistic update local apollo chae when some records has been removed from backend.
   * This method is used when you need to remove the cache with a custom key.
   *
   * @param cacheEntity The name of the entity in the cache.
   * @param filter The key or keys of the entity you want to update.
   * @example
   * pessimisticRemoveRecordFromCache('equipments', { id:'abcd'});
   * pessimisticRemoveRecordFromCache('workorderliness', { workOrderNo:'abcd',lineNo:10000});
   * */
  pessimisticRemoveRecordFromCache<T>(
    cacheEntity: string,
    filter: Partial<T> extends object ? Partial<T> : never
  ) {
    this.apollo.client.cache.modify({
      id: 'ROOT_QUERY',
      fields: {
        [cacheEntity]: (record = [], { DELETE }) => {
          const oldItems = cloneDeep(record.items);
          const newItems = oldItems.filter(
            (rec: T) =>
              !Object.keys(filter).every((key) => {
                const k = key as keyof T;
                return rec[k] === filter[k];
              })
          );

          // If the record is empty, delete it.
          // This is to prevent the cache from returning an empty array. Which causes an error when adding a first item.
          if (newItems.length === 0) return DELETE;
          const newObject = { ...record, items: newItems };
          return newObject;
        },
      },
    });
  }

  /**
   * Optimistic cache update for a single entity.
   *
   * @param cacheEntity The name of the entity in the cache.
   * @param id The id of the entity.
   * @param data The data to update the entity with.
   * @example
   * optimisticCacheUpdate('equipments', 'id', { id: '1', name: 'New Name' });
   *
   * @deprecated Work in progress.
   */
  optimisticCacheUpdate<T>(cacheEntity: string, id: keyof T, data: T) {
    this.apollo.client.cache.modify({
      id: 'ROOT_QUERY',
      fields: {
        [cacheEntity]: (
          record: { items: (T & { __ref: string })[] },
          { readField }
        ) => {
          const i = record.items.findIndex(
            (rec: { __ref: string }) =>
              readField(id as string, rec) === data[id]
          );
          if (i < 0) return record;

          const newRecord = cloneDeep(record);
          newRecord.items[i] = { ...data, __ref: newRecord.items[i].__ref };
          return newRecord;
        },
      },
    });
  }
}
