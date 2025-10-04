package com.sistema_contable.sistema.contable.resources;

import com.sistema_contable.sistema.contable.dto.AccountRequestDTO;
import com.sistema_contable.sistema.contable.dto.AccountResponseDTO;
import com.sistema_contable.sistema.contable.dto.BalanceAccountResponseDTO;
import com.sistema_contable.sistema.contable.exceptions.ModelExceptions;
import com.sistema_contable.sistema.contable.model.*;
import com.sistema_contable.sistema.contable.services.accounting.interfaces.AccountService;
import com.sistema_contable.sistema.contable.services.security.AuthorizationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
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
            System.out.println(Arrays.toString(e.getStackTrace()));
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
        } catch (ModelExceptions e) {
            return new ResponseEntity<>(null, e.getHttpStatus());
        } catch (Exception e) {
            System.out.println(Arrays.toString(e.getStackTrace()));
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //delete account
    @PutMapping("/{id}")
    public ResponseEntity<?> delete(@RequestHeader("Authorization") String token,@PathVariable Long id, @RequestParam(name = "name", required = true) String name) {
        try {
            authService.adminAuthorize(token);
            service.update(id,name);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (ModelExceptions exception) {
            return new ResponseEntity<>(null, exception.getHttpStatus());
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //change name account
    @DeleteMapping("/{id}")
    public ResponseEntity<?> ChangeName(@RequestHeader("Authorization") String token,@PathVariable Long id) {
        try {
            authService.adminAuthorize(token);
            service.delete(id);
            return new ResponseEntity<>(null, HttpStatus.RESET_CONTENT);
        } catch (ModelExceptions exception) {
            return new ResponseEntity<>(null, exception.getHttpStatus());
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //get all accounts
    @GetMapping(produces = "application/json")
    public ResponseEntity<?> getAll(@RequestHeader("Authorization") String token){
        try {
            authService.authorize(token);
            return new ResponseEntity<>(accountResponse(service.getAll()), HttpStatus.OK);
        } catch (ModelExceptions exception) {
            return new ResponseEntity<>(null, exception.getHttpStatus());
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //get account by ID
    @GetMapping(path = "/{id}",produces = "application/json")
    public ResponseEntity<?> getAccountById(@RequestHeader("Authorization") String token,@PathVariable Long id){
        try {
            authService.authorize(token);
            return new ResponseEntity<>(accountResponse(service.searchById(id)), HttpStatus.OK);
        } catch (ModelExceptions exception) {
            return new ResponseEntity<>(null, exception.getHttpStatus());
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //get balance accounts
    @GetMapping(path = "/balance",produces = "application/json")
    public ResponseEntity<?> getBalanceAccounts(@RequestHeader("Authorization") String token){
        try {
            authService.authorize(token);
            return new ResponseEntity<>(balanceAccountResponse(service.getBalanceAccounts()), HttpStatus.OK);
        } catch (ModelExceptions exception) {
            return new ResponseEntity<>(null, exception.getHttpStatus());
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //secondary methods
    private List<BalanceAccountResponseDTO> balanceAccountResponse(List<BalanceAccount> balanceAccounts){
        return balanceAccounts.stream().map(account -> mapper.map(account,BalanceAccountResponseDTO.class)).toList();
    }

    private AccountResponseDTO accountResponse(Account account){
        AccountResponseDTO dto = mapper.map(account, AccountResponseDTO.class);
        List<AccountResponseDTO> dtos = account.getSubAccounts().stream().map(aux -> mapper.map(aux, AccountResponseDTO.class)).toList();
        dto.setChildAccounts(dtos);
        return dto;
    }

    private List<AccountResponseDTO> accountResponse(List<Account> accounts){
        List<AccountResponseDTO> dtos = accounts.stream().map(account -> mapper.map(account, AccountResponseDTO.class)).toList();
        return dtos;
    }
}
