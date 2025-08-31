package com.sistema_contable.sistema.contable.resources;

import com.sistema_contable.sistema.contable.dto.AuthenticationRequestDTO;
import com.sistema_contable.sistema.contable.dto.UserRequestDTO;
import com.sistema_contable.sistema.contable.model.User;
import com.sistema_contable.sistema.contable.services.UserService;
import com.sistema_contable.sistema.contable.services.security.AuthorizationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserResource {

    //dependencies
    @Autowired
    private UserService service;
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private AuthorizationService authService;

}
