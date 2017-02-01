package ufcg.si1.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ufcg.si1.entities.Task;
import ufcg.si1.entities.Todo;
import ufcg.si1.repository.TodoDB;

import javax.validation.Valid;
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
    public @ResponseBody List<Todo> getAll(){
        List<Todo> ans = todoDb.findAll();
        System.out.println(ans);
        return ans;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public void create(@RequestBody Todo todo){
        System.out.println("chegou no POST do server: " + todo.getTitle());
        System.out.println(todo.toString());
//        for(Task t : todo.getTasks())
            todoDb.save(todo);
    }

    @RequestMapping(value = "/save", method = RequestMethod.PATCH)
    public void update(@RequestBody Todo todo){
        System.out.println("chegou no PATCH do server: " + todo.getTitle());
        System.out.println(todo.toString());
        todoDb.save(todo);
    }

//    todoDb.exists()

    @RequestMapping(value="/exists", method = RequestMethod.POST)
    public @ResponseBody boolean exists(@RequestBody Todo todo){
        System.out.println(todo.toString() + " GET TESTE " + todo.getId());
        return todoDb.exists(todo.getId());
    }

//    @RequestMapping(value = "/saveAll", method = RequestMethod.PATCH)
//    public void createTodos(@RequestBody List<Todo> todos){
//        System.out.println("chegou aqui: " + todos.toString());
//        todoDb.save(todos);
//    }
//
//    @RequestMapping(value = "/saveAll", method = RequestMethod.POST)
//    public void updateTodos(@RequestBody List<Todo> todos){
//        System.out.println("chegou aqui: " + todos.toString());
//        todoDb.save(todos);
//    }


}
