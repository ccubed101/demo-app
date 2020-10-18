import { Injectable, Inject } from '@angular/core';

import { Observable, from, of } from 'rxjs';
import { map, switchMap, mergeMap, tap, catchError } from 'rxjs/operators';

import { core, EntityManager, EntityQuery, Entity, EntityType, ComplexType, EntityState, EntityByKeyResult, EntityStateSymbol, FilterQueryOpSymbol, Predicate } from 'breeze-client';

export interface IRepository<T> {
    Add(): T;
    Remove(T): void;
    Get(id: number): T;
    GetAll(): T[];
    fetch(id: number, checkLocalCacheFirst: boolean): Observable<T>;
    fetchWhere(propertyName: string, filterOp: string | FilterQueryOpSymbol, compValue: string): Observable<T[]>;
    fetchAll(callback: (results: T[]) => void): void;
    Find(predicate: (T) => boolean): T[];
    //EntityTypeName: string;
}

export class Repository<T> implements IRepository<T> {

    // Construction

    constructor(
        private entityManager: EntityManager,
    ) {
    }


    // Property Accessors.

    // All derived classes should implement this method.  And only those
    // derived class methods should be called.
    get EntityTypeName(): string {
        throw 'Repository<T>.EntityTypeName (get) shoule never be called.  Only the method in derived classes should be called.';
    }


    // Methods

    Add(): T {
        const entity: T = <T><unknown>(this.entityManager.createEntity(this.EntityTypeName));
        //(entity as any).id = core.getUuid();
        return entity;


        //return <T><unknown>(this.entityManager.createEntity(this.EntityTypeName));
    }

    Remove(T): void {
        (<Entity>T).entityAspect.setDeleted();
    }

    Get(id: number): T {
        return <T><unknown>(this.entityManager.getEntityByKey(this.EntityTypeName, id));
    }

    GetAll(): T[] {

        // Initialize return value.
        //let results: T[] = [];

        // What is the type of entity that we are dealing with?
        let entityType: EntityType | ComplexType = this.entityManager.metadataStore.getEntityType(this.EntityTypeName);

        // Get all the entities of the specified type that 
        return <T[]><unknown>(this.entityManager.getEntities([<EntityType>entityType], [EntityState.Added, EntityState.Unchanged, EntityState.Modified]));

        //return <T[]><unknown>(results);
    }

    fetch(id: number, checkLocalCacheFirst: boolean): Observable<T> {
        return from(this.entityManager.fetchEntityByKey(this.EntityTypeName, id, true)).pipe(
            map((x) => <T><unknown>(x.entity))
        );
    }

    fetchWhere(propertyName: string, filterOp: string | FilterQueryOpSymbol, compValue: string): Observable<T[]> {

        // Setup for WHERE clause.
        var predicate;
        if (typeof filterOp === 'string') {
            predicate = new Predicate(propertyName, <string>filterOp, compValue);
        } else {
            predicate = new Predicate(propertyName, <FilterQueryOpSymbol>filterOp, compValue);
        }

        // MergeStrategy???

        // Build the query.
        let entityType: EntityType = <EntityType>(this.entityManager.metadataStore.getEntityType(this.EntityTypeName, false));
        // Programmer Note: The following statement originally threw an exception,
        //   "This EntityQuery ctor requires a valid json string. The following is not json: $filter=..."
        // The solution to the problem was to execute the following statement,
        //    config.initializeAdapterInstance("uriBuilder", "json");
        // The statement was placed in the EntityManagerFactory.cs file.
        let query = EntityQuery.from(entityType.defaultResourceName).where(predicate).toType(this.EntityTypeName);

        return from(this.entityManager.executeQuery(query))
            .pipe(
                map((queryResults) => queryResults.results),
                map((results) => {
                    console.log(<T[]><unknown>results);
                    return <T[]><unknown>results;
                })
            );
   }

    fetchAll(callback: (results: T[]) => void): void {

        // MergeStrategy???
        const entityType: EntityType = <EntityType>(this.entityManager.metadataStore.getEntityType(this.EntityTypeName, false));
        const query = EntityQuery.from(entityType.defaultResourceName).toType(this.EntityTypeName);

        this.entityManager.executeQuery
            (query,
            result => {
                callback((result.results as unknown) as T[]);
            });





            //map((queryResults) => queryResults.results),
            //map((results) => {
            //    console.log(<T[]><unknown>results);
            //    observable = <T[]><unknown>results;
            //})
        //);

        //this.entityManager.executeQuery(query)
        //    .then((results) => {
        //        console.log(results);
        //    })
        //    .catch((error) => {
        //        console.log(error);
        //    })

        //return null;
    }

    Find(predicate: (T) => boolean): T[] {

        // Initialize return value.
        let results: T[] = null;

        //// What is the type of entity that we are dealing with?
        //let entityType: EntityType | ComplexType = this.entityManager.metadataStore.getEntityType(this.EntityTypeName);

        //// Get all the entities of the specified type that 
        //let entities: Entity[] = this.entityManager.getEntities([<EntityType>entityType], [EntityStates.Added, EntityStates.Unchanged, EntityStates.Modified]);

        let entities: T[] = this.GetAll();

        let entity: T = null;
        for (let entity of entities) {
            if (predicate(entity))
                results.push(<T><unknown>entity);
        }

        return results;
    }

}
