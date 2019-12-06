import {Todo} from "../domain/todo";
import * as Amqp from "amqp-ts"
import {
  CONTENT_TYPE_JSON,
  EXCHANGE,
  ROUTING_KEY_TODO_COMPLETED,
  ROUTING_KEY_TODO_OPEN
} from "../constants/todo.constants";

const opts = {
  headers : {
    "type" : "open",
  },
  contentType : CONTENT_TYPE_JSON
}

//let exchangeName = 'demo-queue';
export class TodoProducer{

  constructor(){

  }

  postTodoOnQueue(todo : Todo){
    let connection = new Amqp.Connection("amqp://localhost");
    let exchange = connection.declareExchange(EXCHANGE, "amq.topic", {durable: true, noCreate: true});
    connection.completeConfiguration().then(() => {
      let msgTodo = new Amqp.Message(todo, opts);
      exchange.send(msgTodo, ROUTING_KEY_TODO_OPEN);
      //exchange.send(msgTodo, ROUTING_KEY_TODO_COMPLETED);
    });
  }
}
