package com.lzyang.trainingprogram.repo;

import java.util.List;

import com.lzyang.trainingprogram.entity.User;

import org.springframework.data.repository.CrudRepository;

public interface UserRepo extends CrudRepository<User, String> {
    
    List<User> findByUsername(String username);

}