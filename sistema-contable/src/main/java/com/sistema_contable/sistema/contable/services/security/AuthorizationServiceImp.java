package com.sistema_contable.sistema.contable.services.security;

import com.sistema_contable.sistema.contable.exceptions.AuthorizationException;
import com.sistema_contable.sistema.contable.model.User;
import com.sistema_contable.sistema.contable.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationServiceImp implements AuthorizationService {

    //dependencies
    @Autowired
    private com.sistema_contable.sistema.contable.util.JwtTokenUtil jwtTokenUtil;
    @Autowired
    private UserService service;


    //methods
    @Override
    public User authorize(String token) throws Exception {
        User userDB = service.findByUsername(jwtTokenUtil.getSubject(token));
        if (!jwtTokenUtil.verify(token) || userDB == null ){throw new AuthorizationException();}
        else{return userDB;}
    }

    public User adminAuthorize(String token) throws Exception {
        User userDB = service.findByUsername(jwtTokenUtil.getSubject(token));
        String role = jwtTokenUtil.getRole(token);
        if (!jwtTokenUtil.verify(token) || userDB == null ){throw new AuthorizationException();}
        else{return userDB;}
    }

}
