import {Request, Response} from "express";
import {Todo} from "../domain/todo";
import {TodoProducer} from "../producer/todo.producer";
const uuidv1 = require('uuid/v1');

let pkg = require(__dirname + '/../../package.json');

export class TodoController {
    private db: any;
    private producer : TodoProducer;

    constructor() {
        this.init();
    }

    init(){
      this.producer = new TodoProducer();
    }

  async create(req: Request, res: Response):Promise<Todo> {
      let uuId = null;
      /*if(req.body.id==null){
        uuId = uuidv1();
      }*/

    let todo = new Todo(uuId, req.body.subject, req.body.description);
      todo.setCreated(new Date());
      todo.setCompleted(false);
    this.producer.postTodoOnQueue(todo);
    return todo;
  }

}

