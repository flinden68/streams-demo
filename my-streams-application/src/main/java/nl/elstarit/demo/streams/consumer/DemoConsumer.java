package nl.elstarit.demo.streams.consumer;

import lombok.extern.slf4j.Slf4j;
import nl.elstarit.demo.streams.binding.ConsumerBinding;
import nl.elstarit.demo.streams.binding.ProducerBinding;
import nl.elstarit.demo.streams.domain.Todo;
import nl.elstarit.demo.streams.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.support.MessageBuilder;

@Slf4j
@EnableBinding(ConsumerBinding.class)
public class DemoConsumer {

  @Autowired
  private ProducerBinding producer;

  @Autowired
  private TodoRepository repository;

  @StreamListener(target = ConsumerBinding.INPUT, condition = "headers['type']=='completed'")
  public void processCompleted(Todo todo) {
    log.info("[DemoConsumer]: Received Completed Todo from queue - {}", todo);
    repository.save(todo);
  }


  /*@StreamListener(target = ConsumerBinding.INPUT)
  public void processAll(Todo todo) {
    log.info("[DemoConsumer]: Received All Todo from queue: {}", todo);
    repository.save(todo);
  }*/

}
