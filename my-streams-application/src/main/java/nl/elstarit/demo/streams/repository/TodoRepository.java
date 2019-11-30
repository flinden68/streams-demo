package nl.elstarit.demo.streams.repository;

import nl.elstarit.demo.streams.domain.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TodoRepository extends MongoRepository<Todo, String> {
}
