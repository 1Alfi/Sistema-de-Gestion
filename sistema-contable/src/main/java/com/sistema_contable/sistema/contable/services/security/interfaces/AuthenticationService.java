package com.sistema_contable.sistema.contable.services.security.interfaces;

import com.sistema_contable.sistema.contable.model.User;

public interface AuthenticationService {
    public String authenticate(User user) throws Exception;
}
