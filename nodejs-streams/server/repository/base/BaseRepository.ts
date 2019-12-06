import { IWrite } from '../interface/IWriteInterface';
import { IRead } from '../interface/IReadInterface';

// we imported all types from mongodb driver, to use in code
import {
    MongoClient,
    Db,
    Collection,
    InsertOneWriteOpResult,
    ObjectID,
    UpdateWriteOpResult, FindAndModifyWriteOpResultObject, DeleteWriteOpResultObject, Cursor
} from 'mongodb';

// that class only can be extended
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
    //creating a property to use your code in all instances
    // that extends your base repository and reuse on methods of class
    public readonly _collection: Collection;

    //we created constructor with arguments to manipulate mongodb operations
    constructor(db: Db, collectionName: string) {
        this._collection = db.collection(collectionName);
    }

    // we add to method, the async keyword to manipulate the insert result
    // of method.
    async create(item: T): Promise<T> {
        // @ts-ignore
      const result: InsertOneWriteOpResult = await this._collection.insertOne(item);
        return result.ops[0];
    }


    async update(id: string, item: T): Promise<T> {
        const result: FindAndModifyWriteOpResultObject = await this._collection.findOneAndUpdate({ "_id": new ObjectID(id)}, {"$set": item}, {returnOriginal: false, upsert: true});
        return result.value;
    }

    async delete(id: string): Promise<boolean> {
        const result: DeleteWriteOpResultObject = await this._collection.deleteOne({ "_id": new ObjectID(id)});
        return !!result.result.ok;
    }

    async find(): Promise<T[]> {
        return await this._collection.find().toArray();
    }

    async findOne(id: string): Promise<T> {
        return await this._collection.findOne({ "_id": new ObjectID(id)});
    }
}
