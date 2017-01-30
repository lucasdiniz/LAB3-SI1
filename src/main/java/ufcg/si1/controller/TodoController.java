package ufcg.si1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ufcg.si1.entities.Todo;
import ufcg.si1.repository.TodoDB;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by lucas on 25/01/2017.
 */

@RestController
@RequestMapping(value = "/todos")
public class TodoController {

    @Autowired
    private TodoDB todoDb;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Todo> getAll(){
        return todoDb.findAll();
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public void create(@RequestBody Todo todo){
        System.out.println("chegou aqui: " + todo.getTitle());
        todoDb.save(todo);
    }

    @RequestMapping(value = "/saveAll", method = RequestMethod.POST)
    public void createTodos(@RequestBody List<Todo> todos){
        System.out.println("chegou aqui: todos");
        todoDb.save(todos);
    }

}
