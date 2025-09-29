package com.sistema_contable.sistema.contable.services;

import com.sistema_contable.sistema.contable.model.User;

import java.util.List;

public interface UserService {
    public void create(User user)throws Exception;
    public User findByUsername(String username) throws Exception;
    List<User> getAll() throws Exception;
    void delete(Long id)throws Exception;
}
