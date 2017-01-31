package ufcg.si1.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by lucas on 25/01/2017.
 */


@Entity
public class Todo{

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    @Column
    private String title;

    @ElementCollection
    @Column
    @OneToMany(mappedBy="taskOwner")
    private List<Task> tasks;

    protected Todo() {}

    public Todo(String title, List<Task> tasks) {
        this.tasks = new ArrayList<>(tasks);
        this.title = title;
    }

    public String getTitle(){
        return this.title;
    }

    public List<Task> getTasks(){return this.tasks;}

    @Override
    public String toString() {
        return String.format(
                "Todo[id=%d, Title='%s', Tasks='%s']",
                id, title, tasks.toString());
    }

}
