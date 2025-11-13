package com.sistema_contable.sistema.contable.services.security;

import com.sistema_contable.sistema.contable.exceptions.AuthenticationException;
import com.sistema_contable.sistema.contable.model.User;
import com.sistema_contable.sistema.contable.services.UserService;
import com.sistema_contable.sistema.contable.services.security.interfaces.AuthenticationService;
import com.sistema_contable.sistema.contable.util.JwtTokenUtil;
import com.sistema_contable.sistema.contable.util.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImp implements AuthenticationService {

    //dependencies
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;


    //methods
    @Override
    public String authenticate(User user) throws Exception {
        //search the user in the db
        User userDB = userService.findByUsername(user.getUsername());
        //check if the user exist and the password
        if(userDB==null || !passwordEncoder.verify(user.getPassword(), userDB.getPassword()))
            {throw new AuthenticationException("Failed to check credentials");}
        else{return jwtTokenUtil.generateToken(user.getUsername(), userDB.getRole().name());}
    }
}
