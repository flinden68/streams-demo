import {Request, Response} from "express";
import {Todo} from "../domain/todo";
import {TodoProducer} from "../producer/todo.producer";

export class TodoController {
  private producer: TodoProducer;

  constructor() {
    this.init();
  }

  init() {
    this.producer = new TodoProducer();
  }

  async create(req: Request, res: Response): Promise<Todo> {
    let uuId = null;
    let todo = new Todo(uuId, req.body.subject, req.body.description);
    todo.setCreated(new Date());
    todo.setCompleted(false);
    this.producer.postTodoOnQueue(todo);
    return todo;
  }

}

