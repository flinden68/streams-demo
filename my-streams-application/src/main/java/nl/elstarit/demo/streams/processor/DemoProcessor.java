package nl.elstarit.demo.streams.processor;

import lombok.extern.slf4j.Slf4j;
import nl.elstarit.demo.streams.binding.ConsumerBinding;
import nl.elstarit.demo.streams.binding.ProducerBinding;
import nl.elstarit.demo.streams.domain.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;

@Slf4j
@EnableBinding({ProducerBinding.class, ConsumerBinding.class})
public class DemoProcessor {

  @Autowired
  private ProducerBinding producer;

  @StreamListener(target = ConsumerBinding.INPUT, condition = "headers['type']=='open'")
  public void processOpen(Todo todo) {
    log.info("Received Open Todo from queue: {}", todo);
    todo.setCompleted(true);

    Message<Todo> msgTodo = MessageBuilder
      .withPayload(todo)
      .setHeader("type", "completed")
      .build();

    log.info("Post Closed Message on Queue: {}", msgTodo);
    producer.producerChannel().send(msgTodo);
  }
}
