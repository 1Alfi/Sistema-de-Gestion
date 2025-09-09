package com.sistema_contable.sistema.contable.resources;

import com.sistema_contable.sistema.contable.dto.AccountRequestDTO;
import com.sistema_contable.sistema.contable.dto.AccountResponseDTO;
import com.sistema_contable.sistema.contable.dto.EntryRequestDTO;
import com.sistema_contable.sistema.contable.exceptions.ModelExceptions;
import com.sistema_contable.sistema.contable.model.Account;
import com.sistema_contable.sistema.contable.model.Entry;
import com.sistema_contable.sistema.contable.model.User;
import com.sistema_contable.sistema.contable.services.accounting.AccountService;
import com.sistema_contable.sistema.contable.services.security.AuthorizationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountResource {

    //dependencies
    @Autowired
    private AccountService service;
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private AuthorizationService authService;


    //endpoints
    @PostMapping
    public ResponseEntity<?> create(@RequestHeader("Authorization") String token, @RequestBody AccountRequestDTO accountDTO){
        try {
            authService.adminAuthorize(token);
            service.create(mapper.map(accountDTO, Account.class));
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@RequestHeader("Authorization") String token,@PathVariable Long id) {
        try {
            authService.adminAuthorize(token);
            service.delete(id);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (ModelExceptions exception) {
            return new ResponseEntity<>(null, exception.getHttpStatus());
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "accounts", produces = "application/json")
    public ResponseEntity<?> getAll(@RequestHeader("Authorization") String token){
        try {
            authService.authorize(token);
            return new ResponseEntity<>(accountResponse(service.getAll()), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //secondary methods
    private MultiValueMap<String, List<AccountResponseDTO>> accountResponse(List<Account> accounts){
        List<AccountResponseDTO> dtos = accounts.stream().map(account -> mapper.map(account, AccountResponseDTO.class)).toList();
        MultiValueMap<String, List<AccountResponseDTO>> response = new LinkedMultiValueMap<>();
        response.add("accounts", dtos);
        return response;
    }
}
