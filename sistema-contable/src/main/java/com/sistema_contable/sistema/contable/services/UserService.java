package com.sistema_contable.sistema.contable.services;

import com.sistema_contable.sistema.contable.model.User;

import java.util.List;

public interface UserService {
    public void create(User user, User userDB);
    public User findByUsername(String username) throws Exception;
    List<User> getAll() throws Exception;
}
