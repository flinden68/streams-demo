export interface IRead<T> {
    find(item: T): Promise<T[]>;
    find(): Promise<T[]>;
    findOne(id: string): Promise<T>;
}