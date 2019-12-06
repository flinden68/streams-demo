import {Tedis} from "tedis";
import {Todo} from "../domain/todo";
const uuidv1 = require('uuid/v1');

export class TodoRedisService {

  private redisClient : Tedis;
  constructor() {
    this.init()
  }

  init(){
    this.redisClient = new Tedis({
      port: 6379,
      host: "127.0.0.1",
      password: "redis",
    });
  }

  save(todo : Todo){
    let uuId = uuidv1();
    let response : any = this.redisClient.set(uuId, JSON.stringify(todo));
    console.log(response);
  }

}
