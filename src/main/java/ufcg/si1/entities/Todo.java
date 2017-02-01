package ufcg.si1.entities;

import javax.persistence.*;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by lucas on 25/01/2017.
 */


@Entity
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String title;

    @Valid
    @ElementCollection
    @Column
    @OneToMany(mappedBy = "taskOwner", fetch = FetchType.EAGER)
    private List<Task> tasks = new ArrayList<>();

    protected Todo() {
    }

    public Todo(String title, List<Task> tasks) {
        this.tasks = new ArrayList<>(tasks);
        this.title = title;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public List<Task> getTasks() {
        return this.tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    @Override
    public String toString() {
        return String.format(
                "Todo[id=%d, Title='%s', Tasks='%s']",
                id, title, tasks.toString());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Todo todo = (Todo) o;

        if (!id.equals(todo.id)) return false;
        if (!title.equals(todo.title)) return false;
        return tasks.equals(todo.tasks);

    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + title.hashCode();
        result = 31 * result + tasks.hashCode();
        return result;
    }
}
