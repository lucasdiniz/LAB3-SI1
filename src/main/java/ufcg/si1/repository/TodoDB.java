package ufcg.si1.repository;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ufcg.si1.entities.Todo;



/**
 * Created by lucas on 25/01/2017.
 */

@Repository
    public interface TodoDB extends JpaRepository<Todo, Integer>{

}
