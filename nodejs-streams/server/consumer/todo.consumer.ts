import {TodoService} from "../service/todo.service";
import {Todo} from "../domain/todo";
import * as Amqp from "amqp-ts";
import {
  EXCHANGE,
  QUEUE_COMPLETED,
  QUEUE_OPEN
} from "../constants/todo.constants";
import {TodoRedisService} from "../service/todo.redis.service";
export class TodoConsumer {

  private mongoSservice : TodoService;
  private redisService : TodoRedisService;

  constructor() {
    this.init();
  }

  init(){
    this.mongoSservice = new TodoService();
    this.redisService = new TodoRedisService();

    console.log("Consumer open for business....");
  }

  consume() {
    let connection = new Amqp.Connection("amqp://localhost");
    let exchange = connection.declareExchange(EXCHANGE, "amq.topic", {durable: true, noCreate: true});
    let queueCompleted = connection.declareQueue(QUEUE_COMPLETED);
    queueCompleted.bind(exchange);
    queueCompleted.activateConsumer((message) => {
      if(message.properties.headers.type == 'completed') {
        console.log("QUEUE COMPLETED: " + JSON.stringify(message.getContent()))
        let todo: Todo = new Todo(null, message.getContent().subject, message.getContent().description);
        todo.setCreated(message.getContent().created);
        todo.setCompleted(message.getContent().completed);
        console.table(todo);
        this.mongoSservice.save(todo)
        this.redisService.save(todo);
        message.ack();
      }
    });
  }
}
