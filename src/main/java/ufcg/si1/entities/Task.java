package ufcg.si1.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by lucas on 25/01/2017.
 */

@Entity
public class Task {

    private String name;
    private boolean done;

    protected Task(){}

    public Task(String name, boolean done){
        this.name = name;
        this.done = done;
    }

}
