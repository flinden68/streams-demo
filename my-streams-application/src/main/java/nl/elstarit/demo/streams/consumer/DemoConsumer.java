package nl.elstarit.demo.streams.consumer;

import lombok.extern.slf4j.Slf4j;
import nl.elstarit.demo.streams.binding.ConsumerBinding;
import nl.elstarit.demo.streams.binding.ProducerBinding;
import nl.elstarit.demo.streams.domain.Todo;
import nl.elstarit.demo.streams.repository.RedisTodoRepository;
import nl.elstarit.demo.streams.repository.MongoTodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;

@Slf4j
@EnableBinding(ConsumerBinding.class)
public class DemoConsumer {

  @Autowired
  private ProducerBinding producer;

  @Autowired
  private MongoTodoRepository repository;

  @Autowired
  private RedisTodoRepository redisRepository;

  @StreamListener(target = ConsumerBinding.INPUT, condition = "headers['type']=='completed'")
  public void processCompleted(Todo todo) {
    log.info("[DemoConsumer]: Received Completed Todo from queue - {}", todo);
    repository.save(todo);
    redisRepository.save(todo);
  }
}
