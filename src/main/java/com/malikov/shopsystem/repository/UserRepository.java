package com.malikov.shopsystem.repository;

import com.malikov.shopsystem.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends PagingAndSortingRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.name=:login")
    User getByLogin(@Param("login") String login);

}
