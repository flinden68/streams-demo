package nl.elstarit.demo.streams.binding;

import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.MessageChannel;

public interface ProducerBinding {
  String OUTPUT = "producerChannel";
  @Output(OUTPUT)
  MessageChannel producerChannel();
}
