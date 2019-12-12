package nl.elstarit.demo.streams.repository;

import nl.elstarit.demo.streams.domain.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public class RedisTodoRepository {

  @Autowired
  private RedisTemplate redisTemplate;

  public void save(Todo todo){
    SetOperations<String, Todo> setOps = redisTemplate.opsForSet();
    UUID uuid = UUID.randomUUID();
    setOps.add(uuid.toString(), todo);
  }
}
