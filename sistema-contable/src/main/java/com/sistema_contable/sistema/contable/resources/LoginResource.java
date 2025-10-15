package com.sistema_contable.sistema.contable.resources;

import com.sistema_contable.sistema.contable.dto.AuthenticationRequestDTO;
import com.sistema_contable.sistema.contable.exceptions.ModelExceptions;
import com.sistema_contable.sistema.contable.model.User;
import com.sistema_contable.sistema.contable.services.security.interfaces.AuthenticationService;
import com.sistema_contable.sistema.contable.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "${FRONT_URL}")
public class LoginResource {

    //dependencies
    @Autowired
    private UserService service;
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping(produces = "application/json")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequestDTO authDTO){
        try {
            String token = authenticationService.authenticate(mapper.map(authDTO, User.class));
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return new ResponseEntity<>(response, null, HttpStatus.OK);
        } catch (ModelExceptions exception) {
            return new ResponseEntity<>(null, exception.getHttpStatus());
        } catch (Exception e) {
            System.out.print(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
