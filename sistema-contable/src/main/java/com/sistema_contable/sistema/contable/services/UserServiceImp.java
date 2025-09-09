package com.sistema_contable.sistema.contable.services;

import com.sistema_contable.sistema.contable.exceptions.UserNotFindException;
import com.sistema_contable.sistema.contable.model.User;
import com.sistema_contable.sistema.contable.repository.UserRepository;
import com.sistema_contable.sistema.contable.util.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImp implements UserService{

    //dependencies
    @Autowired
    private UserRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    //methods
    @Override
    public void create(User user, User userDB) {
        //User userCheck = repository.findByUsername(user.getUsername());

        //if(userCheck!=null || userDB.getRole().name()!="ADMIN"){ // username exist dont create user or user dont admin
            //asdasdasdasdasdasdasdasdasd
       // }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        repository.save(user);
    }

    @Override
    public User findByUsername(String username) throws Exception{
        User userDB = repository.findByUsername(username);
        if(repository.findByUsername(username) == null) {
            throw new UserNotFindException();
        }
        return userDB;
    }

    @Override
    public List<User> getAll() throws Exception {
       return repository.findAll();
    }

    @Override
    public void delete(Long id) throws Exception {
        if(repository.findById(id).isPresent()){repository.deleteById(id);}
        else{throw new UserNotFindException();}
    }
}
