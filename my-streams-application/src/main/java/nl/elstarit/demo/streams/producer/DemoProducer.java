package nl.elstarit.demo.streams.producer;

import lombok.extern.slf4j.Slf4j;
import nl.elstarit.demo.streams.binding.ProducerBinding;
import nl.elstarit.demo.streams.domain.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;

import java.time.LocalDateTime;

@Slf4j
@EnableBinding({ProducerBinding.class})
public class DemoProducer {

  @Autowired
  private ProducerBinding producer;

  public void postTodoOnQueue(Todo todo){

    if(todo.getCreated()==null){
      todo.setCreated(LocalDateTime.now());
    }

    Message<Todo> msgTodo = MessageBuilder
      .withPayload(todo)
      .setHeader("type", "open")
      .build();

    log.info("[DemoProducer]: Post Open Message on Queue - {}", msgTodo);
    producer.producerChannel().send(msgTodo);
  }
}
