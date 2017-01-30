package ufcg.si1.entities;

import javax.persistence.*;

/**
 * Created by lucas on 25/01/2017.
 */

@Entity
public class Task {

    private String name;
    private boolean done;

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;

    protected Task(){}

    public Task(String name, boolean done){
        this.name = name;
        this.done = done;
    }

}
