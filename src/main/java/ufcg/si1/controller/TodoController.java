package ufcg.si1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ufcg.si1.entities.Todo;
import ufcg.si1.repository.TodoDB;
import java.util.List;

/**
 * Created by lucas on 25/01/2017.
 */

@RestController
@RequestMapping(value = "/todos")
public class TodoController {

    @Autowired
    private TodoDB todoDb;

    private final boolean DEBUG = false;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public @ResponseBody List<Todo> getAll(){
        List<Todo> ans = todoDb.findAll();

        if(DEBUG)
            for(Todo x : ans)
                System.out.println("saiu do db " + x.getId());

        return ans;
    }

    @RequestMapping(value = "/remove/{id}", method = RequestMethod.DELETE)
    public void removeTodo(@PathVariable String id){
        if(DEBUG)
            System.out.println("chegou no DELETE do server: id do todo = " + id);
        todoDb.delete(Integer.parseInt(id));
    }

    @RequestMapping(value = "/remove", method = RequestMethod.DELETE)
    public void removeTodo(){
        if(DEBUG)
            System.out.println("chegou no DELETEALL do server");
        todoDb.deleteAll();
    }


    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public @ResponseBody Todo create(@RequestBody String todo){
        if(DEBUG)
            System.out.println("chegou no POST do server: " + todo);

        return todoDb.saveAndFlush(new Todo(todo));
    }

    @RequestMapping(value = "/save/{id}", method = RequestMethod.PATCH)
    public @ResponseBody Todo update(@RequestBody String todo, @PathVariable String id){
        if(DEBUG)
            System.out.println("chegou no PATCH do server: " + todo);

        Todo todoToPatch = todoDb.findOne(Integer.parseInt(id));
        todoToPatch.setData(todo);
        return todoDb.saveAndFlush(todoToPatch);
    }


}
