package com.sistema_contable.sistema.contable.resources;

import com.sistema_contable.sistema.contable.dto.EntryResponseDTO;
import com.sistema_contable.sistema.contable.dto.MovementResponseDTO;
import com.sistema_contable.sistema.contable.dto.UserResponseDTO;
import com.sistema_contable.sistema.contable.exceptions.ModelExceptions;
import com.sistema_contable.sistema.contable.model.Entry;
import com.sistema_contable.sistema.contable.model.Movement;
import com.sistema_contable.sistema.contable.model.User;
import com.sistema_contable.sistema.contable.services.accounting.JournalService;
import com.sistema_contable.sistema.contable.services.security.AuthorizationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
public class JournalResource {


    //dependencies
    @Autowired
    private JournalService service;
    
    @Autowired
    private AuthorizationService authService;

    @Autowired
    private ModelMapper mapper;


    //end points
    @GetMapping
    public ResponseEntity<?> getBetweenDates(@RequestHeader("Authorization") String token, Date after, Date before){
        try {
            User userDB = authService.authorize(token);
            return new ResponseEntity<>(entryResponse(service.getJournalBetween(after, before)), HttpStatus.OK);
        } catch (ModelExceptions exception) {
            return new ResponseEntity<>(null, exception.getHttpStatus());
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //secondary methods
    //create the body for the response and map the entry
    private List<EntryResponseDTO> entryResponse(List<Entry> entrys) {
        List<EntryResponseDTO> dtos = entrys.stream().map(entry-> mapper.map(entry, EntryResponseDTO.class)).toList();
        return dtos;

    }
}
