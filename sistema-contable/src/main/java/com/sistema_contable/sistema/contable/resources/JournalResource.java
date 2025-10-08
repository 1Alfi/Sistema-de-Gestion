package com.sistema_contable.sistema.contable.resources;

import com.sistema_contable.sistema.contable.dto.AccountResponseDTO;
import com.sistema_contable.sistema.contable.dto.EntryResponseDTO;
import com.sistema_contable.sistema.contable.exceptions.ModelExceptions;
import com.sistema_contable.sistema.contable.model.Account;
import com.sistema_contable.sistema.contable.model.Entry;
import com.sistema_contable.sistema.contable.model.User;
import com.sistema_contable.sistema.contable.services.accounting.interfaces.JournalService;
import com.sistema_contable.sistema.contable.services.security.AuthorizationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/journal")
@CrossOrigin(origins = "${FRONT_URL}")
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
    public ResponseEntity<?> getLastEntrys(@RequestHeader("Authorization") String token){
        try {
            User userDB = authService.authorize(token);
            return new ResponseEntity<>(entryResponse(service.getLastEntrys()), HttpStatus.OK);
        } catch (ModelExceptions exception) {
            return new ResponseEntity<>(null, exception.getHttpStatus());
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/between")
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
        return entrys.stream().map(entry-> mapper.map(entry, EntryResponseDTO.class)).toList();
    }
}
