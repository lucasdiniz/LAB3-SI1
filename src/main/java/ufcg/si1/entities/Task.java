package ufcg.si1.entities;

import javax.persistence.*;

/**
 * Created by lucas on 25/01/2017.
 */

//@Entity
public class Task {

//    @Column
//    private String name;
//    @Column
//    private boolean done;
//
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name="todoId")
//    private Todo taskOwner;
//
//    @Id
//    @Column
//    @GeneratedValue(strategy=GenerationType.IDENTITY)
//    private int id;
//
//    protected Task(){}
//
//    public Task(String name, boolean done){
//        this.name = name;
//        this.done = done;
//    }
//
//    public String getName(){return this.name;}
//
//    public boolean getDone(){return this.done;}
//
//    public void setName(String name){this.name = name;}
//
//    public void setDone(boolean done){this.done = done;}
//
//    public Integer getId(){ return this.id; }
//
//    public void setId(Integer id){ this.id = id; }
//
//    @Override
//    public String toString(){
//        return "title: " + this.name + "; done: " + this.done;
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//
//        Task task = (Task) o;
//
//        if (done != task.done) return false;
//        if (id != task.id) return false;
//        if (!name.equals(task.name)) return false;
//        return taskOwner.equals(task.taskOwner);
//
//    }
//
//    @Override
//    public int hashCode() {
//        int result = name.hashCode();
//        result = 31 * result + (done ? 1 : 0);
//        result = 31 * result + taskOwner.hashCode();
//        result = 31 * result + id;
//        return result;
//    }
}
