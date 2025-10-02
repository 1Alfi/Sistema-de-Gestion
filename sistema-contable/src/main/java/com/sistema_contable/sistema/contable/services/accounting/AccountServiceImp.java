package com.sistema_contable.sistema.contable.services.accounting;

import com.sistema_contable.sistema.contable.exceptions.BadAccountException;
import com.sistema_contable.sistema.contable.exceptions.ResourceNotFindException;
import com.sistema_contable.sistema.contable.model.Account;
import com.sistema_contable.sistema.contable.model.ControlAccount;
import com.sistema_contable.sistema.contable.repository.AccountRepository;
import jakarta.servlet.Servlet;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImp implements AccountService{

    @Autowired
    private AccountRepository repository;
    @Autowired
    private Servlet servlet;

    @Override
    public void create(Account account, Long accountID)throws Exception{
        //formats the name
        String name = account.getName().strip();
        String aux = name.substring(0, 1).toUpperCase() + name.substring(1);
        account.setName(aux);
        //check that there are no accounts with the same name
        if(this.findByName(account.getName())!=null) {
            throw new BadAccountException();}
        //new account with father
        if(accountID!=null){
            //search in db the "father" account
            ControlAccount accountBD = (ControlAccount) Hibernate.unproxy(repository.getById(accountID));
            if(accountBD==null){
                throw new BadAccountException();}
            accountBD.addChildren(account);
            //check if the account code is larger than others
            if (this.longestCode()<accountBD.getCode().length()){
                this.refreshCodes();}
            repository.save(accountBD);}
        //new root account
        else{
            this.rootCode(account);
            repository.save(account);}}


    @Override
    public void delete(Long id)throws Exception{
        if(repository.findById(id).isPresent()){repository.deleteById(id);}
        else {throw new ResourceNotFindException();}
    }

    @Override
    public void update(Long id, String nombre) throws Exception {
        if(this.findByName(nombre)!=null){throw new BadAccountException();}
        Account account = this.findByID(id);
        account.setName(nombre);
        repository.save(account);
    }

    @Override
    public List<Account> getAll() throws Exception {
        return repository.findAll();
    }

    @Override
    public Account findByID(Long id) throws Exception{
        return repository.getById(id);
    }

    @Override
    public Account findByName(String name) throws Exception{
        return repository.findByName(name);
    }

    @Override
    public List<Account> getBalanceAccounts() throws Exception {
        return repository.getBalanceAccounts();
    }

    public List<Account> getRootAccounts()throws Exception{
        return repository.getRootAccounts();
    }

    //secondary methods
    private int longestCode() throws Exception {
        int longest = 0;
        for (Account account : this.getAll()){
            if(account.getCode().length()>longest){longest=account.getCode().length();}
        }
        return longest;
    }

    private void rootCode(Account account) throws Exception {
        int accountCode = this.getRootAccounts().size()+1;
        if(accountCode>=10) {
            account.setCode(String.valueOf(accountCode));}
        else {
            account.setCode(0+String.valueOf(accountCode));}
        int codeLength = this.longestCode();
        while(account.getCode().length()<codeLength){
            account.setCode(account.getCode()+".00");
        }
    }


    private void refreshCodes() throws Exception {
        int codeLength = this.longestCode();
        for (Account account : this.getAll()){
             while(account.getCode().length()<codeLength){
                 account.setCode(account.getCode()+".00");
             }
        }
    }
}
