package com.sistema_contable.sistema.contable.resources;

import com.sistema_contable.sistema.contable.dto.EntryRequestDTO;
import com.sistema_contable.sistema.contable.dto.Mapper;
import com.sistema_contable.sistema.contable.exceptions.ModelExceptions;
import com.sistema_contable.sistema.contable.model.Entry;
import com.sistema_contable.sistema.contable.model.User;
import com.sistema_contable.sistema.contable.services.accounting.interfaces.EntryService;
import com.sistema_contable.sistema.contable.services.security.interfaces.AuthorizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/entry")
@CrossOrigin(origins = "${FRONT_URL}")
public class EntryResource {

    //dependencies
    @Autowired
    private EntryService service;
    @Autowired
    private Mapper mapper;
    @Autowired
    private AuthorizationService authService;

    //endpoints
    @PostMapping(path = "/create")
    public ResponseEntity<?> create(@RequestHeader("Authorization") String token, @RequestBody EntryRequestDTO entryDTO) {
        try {
            User userDB = authService.authorize(token);
            service.create(mapper.map(entryDTO, Entry.class), userDB);
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        } catch (ModelExceptions exception){
            return new ResponseEntity<>(null, exception.getHttpStatus());
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
