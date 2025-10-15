package com.sistema_contable.sistema.contable.services.accounting;

import com.sistema_contable.sistema.contable.exceptions.AccountNotFindException;
import com.sistema_contable.sistema.contable.exceptions.BadAccountException;
import com.sistema_contable.sistema.contable.exceptions.ResourceNotFindException;
import com.sistema_contable.sistema.contable.model.Account;
import com.sistema_contable.sistema.contable.model.BalanceAccount;
import com.sistema_contable.sistema.contable.model.ControlAccount;
import com.sistema_contable.sistema.contable.repository.AccountRepository;
import com.sistema_contable.sistema.contable.services.accounting.interfaces.AccountService;
import com.sistema_contable.sistema.contable.services.accounting.interfaces.EntryService;
import com.sistema_contable.sistema.contable.services.accounting.interfaces.MovementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.beans.Transient;
import java.util.List;

@Service
public class AccountServiceImp implements AccountService {

    @Autowired
    private AccountRepository repository;
    @Autowired
    private MovementService movementService;

    //CRUD
    @Override
    public void create(Account account, Long accountID)throws Exception{
        //formats the name
        String name = account.getName().strip();
        String formatName = name.substring(0, 1).toUpperCase() + name.substring(1);
        account.setName(formatName);
        //set the state off the account in true/active
        account.setActive(true);
        //check that there are no accounts with the same name
        if(this.searchByName(account.getName())!=null) {throw new AccountNotFindException();}
        //new account with father
        if(accountID!=null){
            //search in db the "father" account
            ControlAccount accountBD = this.searchControlAccount(accountID);
            if(accountBD==null){throw new AccountNotFindException();}
            accountBD.addChildren(account);
            account.setPlus(accountBD.isPlus());
            repository.save(accountBD);}
        //new root account
        else{
            this.rootCode(account);
            repository.save(account);}}

    @Override
    public void delete(Long id)throws Exception{
        if(repository.findById(id).isPresent()){
            Account account = repository.findById(id).get();
            if(this.accountUsedInMovements(account)){
                //logic delete
                account.desactivate();
                repository.save(account);
            }
            else{
                repository.delete(account);}
            }
        else {
            throw new AccountNotFindException();}}

    //update the name of the account
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
        return lastBalance;}

    //logic for root accounts code
    private void rootCode(Account account) throws Exception {
        int accountCode = this.getRootAccounts().size()+1;
        account.setCode(String.valueOf(accountCode));}

    //check if the account is used in entrys/movements
    private boolean accountUsedInMovements(Account account) throws Exception {
        return !movementService.getMovementsByAccount(account).isEmpty();
    }
}
