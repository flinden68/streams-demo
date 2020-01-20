# NodeJS streams demo

## Producer

```
curl localhost:4000/api/todo -X POST -H "Content-Type: application/json" -d  {"description":"test", "subject":"boe"}
```

## Processor
The processor handles messages and changed a status and put it back on the queue

## Consumer
The consumer will consume a message save it in either Redis or Mongodb
