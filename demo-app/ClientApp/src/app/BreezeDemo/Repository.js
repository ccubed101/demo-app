"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var breeze_client_1 = require("breeze-client");
var Repository = /** @class */ (function () {
    // Construction
    function Repository(entityManager) {
        this.entityManager = entityManager;
    }
    Object.defineProperty(Repository.prototype, "EntityTypeName", {
        // Property Accessors.
        // All derived classes should implement this method.  And only those
        // derived class methods should be called.
        get: function () {
            throw 'Repository<T>.EntityTypeName (get) shoule never be called.  Only the method in derived classes should be called.';
        },
        enumerable: true,
        configurable: true
    });
    // Methods
    Repository.prototype.Add = function () {
        return (this.entityManager.createEntity(this.EntityTypeName));
    };
    Repository.prototype.Remove = function (T) {
        T.entityAspect.setDeleted();
    };
    Repository.prototype.Get = function (id) {
        return (this.entityManager.getEntityByKey(this.EntityTypeName, id));
    };
    Repository.prototype.GetAll = function () {
        // Initialize return value.
        //let results: T[] = [];
        // What is the type of entity that we are dealing with?
        var entityType = this.entityManager.metadataStore.getEntityType(this.EntityTypeName);
        // Get all the entities of the specified type that 
        return (this.entityManager.getEntities([entityType], [breeze_client_1.EntityState.Added, breeze_client_1.EntityState.Unchanged, breeze_client_1.EntityState.Modified]));
        //return <T[]><unknown>(results);
    };
    Repository.prototype.fetch = function (id, checkLocalCacheFirst) {
        return rxjs_1.from(this.entityManager.fetchEntityByKey(this.EntityTypeName, id, true)).pipe(operators_1.map(function (x) { return (x.entity); }));
    };
    Repository.prototype.fetchWhere = function (propertyName, filterOp, compValue) {
        // Setup for WHERE clause.
        var predicate;
        if (typeof filterOp === 'string') {
            predicate = new breeze_client_1.Predicate(propertyName, filterOp, compValue);
        }
        else {
            predicate = new breeze_client_1.Predicate(propertyName, filterOp, compValue);
        }
        // MergeStrategy???
        // Build the query.
        var entityType = (this.entityManager.metadataStore.getEntityType(this.EntityTypeName, false));
        // Programmer Note: The following statement originally threw an exception,
        //   "This EntityQuery ctor requires a valid json string. The following is not json: $filter=..."
        // The solution to the problem was to execute the following statement,
        //    config.initializeAdapterInstance("uriBuilder", "json");
        // The statement was placed in the EntityManagerFactory.cs file.
        var query = breeze_client_1.EntityQuery.from(entityType.defaultResourceName).where(predicate).toType(this.EntityTypeName);
        return rxjs_1.from(this.entityManager.executeQuery(query))
            .pipe(operators_1.map(function (queryResults) { return queryResults.results; }), operators_1.map(function (results) {
            console.log(results);
            return results;
        }));
    };
    Repository.prototype.fetchAll = function () {
        // MergeStrategy???
        var entityType = (this.entityManager.metadataStore.getEntityType(this.EntityTypeName, false));
        var query = breeze_client_1.EntityQuery.from(entityType.defaultResourceName).toType(this.EntityTypeName);
        return rxjs_1.from(this.entityManager.executeQuery(query)).pipe(operators_1.map(function (queryResults) { return queryResults.results; }), operators_1.map(function (results) {
            console.log(results);
            return results;
        }));
        //this.entityManager.executeQuery(query)
        //    .then((results) => {
        //        console.log(results);
        //    })
        //    .catch((error) => {
        //        console.log(error);
        //    })
        //return null;
    };
    Repository.prototype.Find = function (predicate) {
        // Initialize return value.
        var results = null;
        //// What is the type of entity that we are dealing with?
        //let entityType: EntityType | ComplexType = this.entityManager.metadataStore.getEntityType(this.EntityTypeName);
        //// Get all the entities of the specified type that 
        //let entities: Entity[] = this.entityManager.getEntities([<EntityType>entityType], [EntityStates.Added, EntityStates.Unchanged, EntityStates.Modified]);
        var entities = this.GetAll();
        var entity = null;
        for (var _i = 0, entities_1 = entities; _i < entities_1.length; _i++) {
            var entity_1 = entities_1[_i];
            if (predicate(entity_1))
                results.push(entity_1);
        }
        return results;
    };
    return Repository;
}());
exports.Repository = Repository;
//# sourceMappingURL=Repository.js.map