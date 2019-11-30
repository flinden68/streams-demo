package nl.elstarit.demo.streams.consumer;

import lombok.extern.slf4j.Slf4j;
import nl.elstarit.demo.streams.binding.ConsumerBinding;
import nl.elstarit.demo.streams.domain.Todo;
import nl.elstarit.demo.streams.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.messaging.handler.annotation.Payload;

@Slf4j
@EnableBinding(ConsumerBinding.class)
public class DemoConsumer {

  @Autowired
  private TodoRepository repository;

  @StreamListener(target = ConsumerBinding.INPUT, condition = "headers['type']=='completed'")
  public void processCompleted(Todo todo) {
    log.info("Received Completed from queue: {}", todo);
    repository.save(todo);
  }

  @StreamListener(target = ConsumerBinding.INPUT, condition = "headers['type']=='open'")
  public void processOpen(@Payload  Todo todo) {
    log.info("Received Open Todo from queue: {}", todo);
    repository.save(todo);
  }

}
