package com.sistema_contable.sistema.contable.resources;

import com.sistema_contable.sistema.contable.dto.AccountRequestDTO;
import com.sistema_contable.sistema.contable.dto.AccountResponseDTO;
import com.sistema_contable.sistema.contable.exceptions.ModelExceptions;
import com.sistema_contable.sistema.contable.model.*;
import com.sistema_contable.sistema.contable.services.accounting.AccountService;
import com.sistema_contable.sistema.contable.services.security.AuthorizationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    //create balance account
    @PostMapping(path = "/balance")
    public ResponseEntity<?> createBalanceAccount(@RequestHeader("Authorization") String token, @RequestBody AccountRequestDTO accountDTO, @RequestParam(name = "id", required = false) Long id){
        try {
            authService.adminAuthorize(token);
            service.create(mapper.map(accountDTO, BalanceAccount.class), id);
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        } catch (ModelExceptions exception) {
            return new ResponseEntity<>(null, exception.getHttpStatus());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //create control account
    @PostMapping(path = "/control")
    public ResponseEntity<?> createControlAccount(@RequestHeader("Authorization") String token, @RequestBody AccountRequestDTO accountDTO, @RequestParam(name = "id", required = false) Long id){
        try {
            authService.adminAuthorize(token);
            service.create(mapper.map(accountDTO, ControlAccount.class), id);
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        } catch (ModelExceptions exception) {
            return new ResponseEntity<>(null, exception.getHttpStatus());
        } catch (Exception e) {
            System.out.println(e.getMessage());
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

    @GetMapping(produces = "application/json")
    public ResponseEntity<?> getAll(@RequestHeader("Authorization") String token){
        try {
            authService.authorize(token);
            return new ResponseEntity<>(accountResponse(service.getAll()), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //secondary methods
    private List<AccountResponseDTO> accountResponse(List<Account> accounts){
        List<AccountResponseDTO> dtos = accounts.stream().map(account -> mapper.map(account, AccountResponseDTO.class)).toList();
        return dtos;
    }
}
