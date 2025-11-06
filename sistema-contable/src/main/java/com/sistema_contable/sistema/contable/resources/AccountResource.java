package com.sistema_contable.sistema.contable.resources;

import com.sistema_contable.sistema.contable.dto.AccountRequestDTO;
import com.sistema_contable.sistema.contable.dto.AccountResponseDTO;
import com.sistema_contable.sistema.contable.exceptions.ModelExceptions;
import com.sistema_contable.sistema.contable.model.*;
import com.sistema_contable.sistema.contable.services.accounting.interfaces.AccountService;
import com.sistema_contable.sistema.contable.services.security.interfaces.AuthorizationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/accounts")
@CrossOrigin(origins = "${FRONT_URL}")
public class AccountResource {

    //dependencies
    @Autowired
    private AccountService service;
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private AuthorizationService authService;


    //ENDPOINTS
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
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);}}

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
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);}}

    //delete/desactivate account
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@RequestHeader("Authorization") String token,@PathVariable Long id) {
        try {
            authService.adminAuthorize(token);
            service.delete(id);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (ModelExceptions exception) {
            return new ResponseEntity<>(null, exception.getHttpStatus());
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);}}


    //activate account
    @PutMapping("/activate/{id}")
    public ResponseEntity<?> activateAccount(@RequestHeader("Authorization") String token,@PathVariable Long id){
        try {
            authService.adminAuthorize(token);
            service.activate(id);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (ModelExceptions exception) {
            return new ResponseEntity<>(null, exception.getHttpStatus());
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);}}

    //change name account
    @PutMapping("/{id}")
    public ResponseEntity<?> changeName(@RequestHeader("Authorization") String token, @PathVariable Long id, @RequestParam(name = "name", required = true) String name) {
        try {
            authService.adminAuthorize(token);
            service.update(id,name);
            return new ResponseEntity<>(null, HttpStatus.RESET_CONTENT);
        } catch (ModelExceptions exception) {
            return new ResponseEntity<>(null, exception.getHttpStatus());
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);}}

    //get all accounts
    @GetMapping(produces = "application/json")
    public ResponseEntity<?> getAll(@RequestHeader("Authorization") String token){
        try {
            authService.authorize(token);
            return new ResponseEntity<>(accountResponse(service.getAll()), HttpStatus.OK);
        } catch (ModelExceptions exception){
            return new ResponseEntity<>(null, exception.getHttpStatus());
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);}}

    //get account by ID
    @GetMapping(path = "/{id}",produces = "application/json")
    public ResponseEntity<?> getAccountById(@RequestHeader("Authorization") String token,@PathVariable Long id){
        try {
            authService.authorize(token);
            return new ResponseEntity<>(accountResponse(service.searchById(id)), HttpStatus.OK);
        } catch (ModelExceptions exception) {
            return new ResponseEntity<>(null, exception.getHttpStatus());
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);}}

    //get balance accounts
    @GetMapping(path = "/balance",produces = "application/json")
    public ResponseEntity<?> getBalanceAccounts(@RequestHeader("Authorization") String token){
        try {
            authService.authorize(token);
            return new ResponseEntity<>(accountResponse(service.getBalanceAccounts()), HttpStatus.OK);
        }catch (ModelExceptions exception) {
            return new ResponseEntity<>(null, exception.getHttpStatus());
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);}}

    //get account balance
    @GetMapping(path = "/getbalance/{id}",produces = "application/json")
    public ResponseEntity<?> getAccountBalance(@RequestHeader("Authorization") String token,@PathVariable Long id){
        try {
            authService.authorize(token);
            Map<String, Double> response = new HashMap<>();
            response.put("balance", service.lastBalance(id));
            return new ResponseEntity<>(response,HttpStatus.OK);
        }catch (ModelExceptions exception) {
            return new ResponseEntity<>(null, exception.getHttpStatus());
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);}}

    //METRICS
    //get results
    @GetMapping(path = "/results")
    public ResponseEntity<?> getResults(@RequestHeader("Authorization") String token){
        try {
            authService.authorize(token);
            Map<String, Double> response = new HashMap<>();
            response.put("results", service.results());
            return new ResponseEntity<>(response,HttpStatus.OK);
        }catch (ModelExceptions exception) {
            return new ResponseEntity<>(null, exception.getHttpStatus());
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);}}

    //get equity
    @GetMapping(path = "/equity")
    public ResponseEntity<?> getEquity(@RequestHeader("Authorization") String token){
        try {
            authService.authorize(token);
            Map<String, Double> response = new HashMap<>();
            response.put("equity", service.equity());
            return new ResponseEntity<>(response,HttpStatus.OK);
        }catch (ModelExceptions exception) {
            return new ResponseEntity<>(null, exception.getHttpStatus());
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);}}

    //secondary methods
    private AccountResponseDTO accountResponse(Account account){
        AccountResponseDTO dto = mapper.map(account, AccountResponseDTO.class);
        List<AccountResponseDTO> dtos = account.getSubAccounts().stream().map(aux -> mapper.map(aux, AccountResponseDTO.class)).toList();
        dto.setChildAccounts(dtos);
        return dto;
    }

    // ? extends accounts accept superclass and subclasses
    private List<AccountResponseDTO> accountResponse(List<? extends Account> accounts){
        List<AccountResponseDTO> dtos = accounts.stream().map(account -> mapper.map(account, AccountResponseDTO.class)).toList();
        return dtos;
    }
}
