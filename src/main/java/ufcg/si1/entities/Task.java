package ufcg.si1.entities;

import javax.persistence.*;

/**
 * Created by lucas on 25/01/2017.
 */

@Entity
public class Task {

    @Column
    private String name;
    @Column
    private boolean done;

    @ManyToOne(fetch=FetchType.LAZY)
    private Todo taskOwner;

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    protected Task(){}

    public Task(String name, boolean done){
        this.name = name;
        this.done = done;
    }

    public String getName(){return this.name;}

    public boolean getDone(){return this.done;}

    @Override
    public String toString(){
        return "title: " + this.name + "; done: " + this.done;
    }

}
