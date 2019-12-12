package nl.elstarit.demo.streams.domain;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.redis.core.RedisHash;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.LocalDateTime;

@Document
@Data
@Builder
public class Todo implements Serializable {

  @Id
  private String id;

  @NotBlank
  private String subject;

  @NotBlank
  private String description;

  private LocalDateTime created;

  private boolean completed;
}
