package com.sistema_contable.sistema.contable.services.accounting;

import com.sistema_contable.sistema.contable.exceptions.AccountNotFindException;
import com.sistema_contable.sistema.contable.exceptions.BadAccountException;
import com.sistema_contable.sistema.contable.exceptions.ResourceNotFindException;
import com.sistema_contable.sistema.contable.model.Account;
import com.sistema_contable.sistema.contable.model.BalanceAccount;
import com.sistema_contable.sistema.contable.model.ControlAccount;
import com.sistema_contable.sistema.contable.repository.AccountRepository;
import com.sistema_contable.sistema.contable.services.accounting.interfaces.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImp implements AccountService {

    @Autowired
    private AccountRepository repository;

    //CRUD
    @Override
    public void create(Account account, Long accountID)throws Exception{
        //formats the name
        String name = account.getName().strip();
        String aux = name.substring(0, 1).toUpperCase() + name.substring(1);
        account.setName(aux);
        account.setActive(true);
        //check that there are no accounts with the same name
        if(this.searchByName(account.getName())!=null) {throw new AccountNotFindException();}
        //new account with father
        if(accountID!=null){
            //search in db the "father" account
            ControlAccount accountBD = this.searchControlAccount(accountID);
            if(accountBD==null){throw new AccountNotFindException();}
            int longestCode = this.longestCode();
            accountBD.addChildren(account);
            account.setPlus(accountBD.isPlus());
            //check if the account code is larger than others
            if (longestCode<accountBD.getCode().length()){this.refreshCodes();}
            repository.save(accountBD);}
        //new root account
        else{
            this.rootCode(account);
            repository.save(account);}}

    @Override
    public void delete(Long id)throws Exception{
        if(repository.findById(id).isPresent()){repository.deleteById(id);}
        else {throw new ResourceNotFindException();}}

    @Override
    public void update(Long id, String nombre) throws Exception {
        if(this.searchByName(nombre)!=null){throw new BadAccountException();}
        Account account = this.searchById(id);
        account.setName(nombre);
        repository.save(account);}


    //GETTERS
    //get all
    @Override
    public List<Account> getAll() throws Exception {return repository.findAll();}

    //get all balance accounts
    @Override
    public List<BalanceAccount> getBalanceAccounts() throws Exception {return repository.getBalanceAccounts();}

    //get all control accounts
    @Override
    public List<ControlAccount> getRootAccounts()throws Exception{return repository.getRootAccounts();}


    //SEARCHES
    //by id all types
    @Override
    public Account searchById(Long id) throws Exception{return repository.searchById(id);}

    //by name
    @Override
    public Account searchByName(String name) throws Exception{return repository.searchByName(name);}

    //balance accounts by id
    @Override
    public BalanceAccount searchBalanceAccount(Long id) throws Exception {return repository.searchBalanceAccount(id);}

    //control accounts by id
    @Override
    public ControlAccount searchControlAccount(Long id) throws Exception {return repository.searchControlAccount(id);}


    //SECONDARY METHODS
    //search last balance of account
    @Override
    public Double lastBalance(Long id) throws Exception {
        Double lastBalance = repository.searchLastBalance(id);
        if(lastBalance==null){return 0D;}
        return lastBalance;
    }

    //return the longest code of all accounts
    private int longestCode() throws Exception {
        int longest = 0;
        for (Account account : this.getAll()){
            if(account.getCode().length()>longest){longest=account.getCode().length();}}
        return longest;}

    //logic for root accounts code
    private void rootCode(Account account) throws Exception {
        int accountCode = this.getRootAccounts().size()+1;
        if(accountCode>=10) {
            account.setCode(String.valueOf(accountCode));}
        else {
            account.setCode(0+String.valueOf(accountCode));}
        int codeLength = this.longestCode();
        while(account.getCode().length()<codeLength){
            account.setCode(account.getCode()+".00");}}

    //formats all accounts code
    @Override
    public void refreshCodes() throws Exception {
        int codeLength = this.longestCode();
        for (Account account : this.getAll()){
             while(account.getCode().length()<codeLength){
                 account.setCode(account.getCode()+".00");}}}
}
