package nl.elstarit.demo.streams.binding;

import org.springframework.cloud.stream.annotation.Input;
import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.SubscribableChannel;

public interface ProcessorBinding {
  String OUTPUT = "processorChannel";
  String INPUT = "processorChannel";

  @Input(INPUT)
  SubscribableChannel processorInChannel();

  @Output(OUTPUT)
  MessageChannel processorOutChannel();
}
