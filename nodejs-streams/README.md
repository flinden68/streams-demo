# NodeJS streams demo
A nodeJS application which interacts with an event bus

## Run it
```
npm install
npm run start
```
## Producer

```
curl localhost:4000/api/todo -X POST -H "Content-Type: application/json" -d  {"description":"test", "subject":"boe"}
```

## Processor
The processor handles messages and changed a status and put it back on the queue

## Consumer
The consumer will consume a message save it in either Redis or Mongodb
