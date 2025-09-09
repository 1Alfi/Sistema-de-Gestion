package com.sistema_contable.sistema.contable.resources;

import com.sistema_contable.sistema.contable.dto.MovementRequestDTO;
import com.sistema_contable.sistema.contable.model.Movement;
import com.sistema_contable.sistema.contable.model.User;
import com.sistema_contable.sistema.contable.services.accounting.MovementService;
import com.sistema_contable.sistema.contable.services.security.AuthorizationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/movements")
@CrossOrigin(origins = "http://localhost:3000")
public class MovementResource {
    //dependencies
    @Autowired
    private MovementService service;
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private AuthorizationService authService;

    //endpoints
    @PostMapping(path = "/create")
    public ResponseEntity<?> create(@RequestHeader("Authorization") String token, @RequestBody MovementRequestDTO movementDTO) {
        try {
            //Verifica si el user del token es admin y lo retorna para verificar que admin en la db en el service
            User userDB = authService.authorize(token);
            service.create(mapper.map(movementDTO, Movement.class));
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
