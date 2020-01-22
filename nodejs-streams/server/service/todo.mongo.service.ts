import {TodoRepository} from "../repository/TodoRepository";
import {MongoClient} from "mongodb";
import {Todo} from "../domain/todo";

const mongoUrl = 'mongodb://localhost:27017/';
const dbName = 'todo-store';
export class TodoMongoService{
  private db: any;
  private repository : TodoRepository;

  constructor() {
    this.init();
  }

  init(){
    MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
      if (err) return console.log(err)
      this.db = client.db(dbName) // whatever your database name is
      this.repository = new TodoRepository(this.db, 'todo');
    })
  }

  save(todo : Todo){
    return this.repository.create(todo);
  }
}
