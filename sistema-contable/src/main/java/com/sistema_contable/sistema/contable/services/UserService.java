package com.sistema_contable.sistema.contable.services;

import com.sistema_contable.sistema.contable.model.User;

public interface UserService {
    public void create(User user);
    public User findByUsername(String username) throws Exception;
}
