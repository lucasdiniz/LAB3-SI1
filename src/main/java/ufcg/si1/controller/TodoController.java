package ufcg.si1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ufcg.si1.entities.Todo;
import ufcg.si1.repository.TodoDB;

import java.util.List;

/**
 * Created by lucas on 25/01/2017.
 */

@RestController
@RequestMapping(value = "/todos")
public class TodoController {


    private TodoDB todoDb;

    @Autowired
    public TodoController(TodoDB todoDb){
        this.todoDb = todoDb;
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Todo> getAll(){
        return todoDb.findAll();
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public List<Todo> create(@RequestBody Todo todo){
        todoDb.save(todo);
        return todoDb.findAll();
    }

}
