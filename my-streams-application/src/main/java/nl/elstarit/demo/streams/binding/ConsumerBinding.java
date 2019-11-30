package nl.elstarit.demo.streams.binding;

import org.springframework.cloud.stream.annotation.Input;
import org.springframework.messaging.SubscribableChannel;

public interface ConsumerBinding {
  String INPUT = "consumerChannel";
  @Input(INPUT)
  SubscribableChannel consumerChannel();
}
