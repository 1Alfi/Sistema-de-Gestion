package com.sistema_contable.sistema.contable.services.security;

import com.sistema_contable.sistema.contable.model.User;

public interface AuthorizationService {
    public User authorize(String token) throws Exception;
}
