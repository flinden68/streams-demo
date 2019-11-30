package nl.elstarit.demo.streams.controller;

import lombok.extern.slf4j.Slf4j;
import nl.elstarit.demo.streams.domain.Todo;
import nl.elstarit.demo.streams.producer.DemoProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/api")
public class ApiController {

  @Autowired
  private DemoProducer producer;

  @PostMapping("/todo")
  public ResponseEntity<Object> post(@Valid @RequestBody Todo todo, Errors errors){
    if(errors.hasErrors()){
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    log.info("Posted: {}", todo);
    producer.postTodoOnQueue(todo);
    return new ResponseEntity<>(todo, HttpStatus.OK);
  }
}
