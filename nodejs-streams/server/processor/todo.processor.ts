import * as Amqp from "amqp-ts";
import {
  CONTENT_TYPE_JSON,
  EXCHANGE,
  QUEUE_OPEN, RABBITMQ_LOCAL_URL
} from "../constants/todo.constants";
import {Todo} from "../domain/todo";

const opts = {
  headers : {
    "type" : "completed",
  },
  contentType : CONTENT_TYPE_JSON
}

export class TodoProcessor {

  constructor(){
    this.init();
  }

  init(){
    console.log("Processor open for business....");
  }

  process(){
      let connection = new Amqp.Connection(RABBITMQ_LOCAL_URL);
      let exchange = connection.declareExchange(EXCHANGE, "amq.topic", {durable: true, noCreate: true});
      connection.completeConfiguration().then(() => {
        let queueOpen = connection.declareQueue(QUEUE_OPEN);
        queueOpen.bind(exchange);
        queueOpen.activateConsumer((message) => {
          if (message.properties.headers.type === 'open') {
            console.log("QUEUE OPEN: " + JSON.stringify(message.getContent()));
            let todo: Todo = new Todo(null, message.getContent().subject, message.getContent().description);
            todo.setCreated(message.getContent().created);
            todo.setCompleted(true);

            let msgTodo = new Amqp.Message(todo, opts);
            exchange.send(msgTodo);
            message.ack();
          }
        });
      });
  }
}
