import {TodoRepository} from "../repository/TodoRepository";
import {MongoClient} from "mongodb";
import {Todo} from "../domain/todo";

const mongoUrl = 'mongodb://localhost:27017/';
const mongoUrlAtlas = 'mongodb://fa_events:ThHch9gn4RTXdZf@events-store-shard-00-00-e0aps.mongodb.net:27017,events-store-shard-00-01-e0aps.mongodb.net:27017,events-store-shard-00-02-e0aps.mongodb.net:27017/test?ssl=true&replicaSet=events-store-shard-0&authSource=admin&retryWrites=true'
const dbName = 'todo-store';
export class TodoService{
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
    //const todo = new Todo(null, req.body.subject, req.body.description, req.body.created, req.body.completed);
    return this.repository.create(todo);
  }
}
