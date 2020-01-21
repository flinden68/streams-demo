# Spring cloud stream Demo
a demo Spring Cloud Streams application for my stream presentation

## Run it
```aidl
mvn clean install
mvn spring-boot:run
```
## Producer
There is a Swagger client to put messages on queue, http://localhost:3031/demo/swagger-ui.html
```
curl http://localhost:3031/demo/api/todo -X POST -H "Content-Type: application/json" -d  {"description":"test", "subject":"boe"}
```

## Processor
The processor handles messages and changed a status and put it back on the queue

## Consumer
The consumer will consume a message save it in either Redis or Mongodb


