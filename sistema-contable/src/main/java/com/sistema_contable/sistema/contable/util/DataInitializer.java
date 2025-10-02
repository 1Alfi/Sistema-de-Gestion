package com.sistema_contable.sistema.contable.util;

import com.sistema_contable.sistema.contable.model.Account;
import com.sistema_contable.sistema.contable.model.ControlAccount;
import com.sistema_contable.sistema.contable.model.Role;
import com.sistema_contable.sistema.contable.model.User;
import com.sistema_contable.sistema.contable.services.UserService;
import com.sistema_contable.sistema.contable.services.accounting.interfaces.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserService userService;
    @Autowired
    private AccountService accountService;

    public DataInitializer(UserService userService, AccountService accountService) {
        this.userService = userService;
        this.accountService = accountService;
    }

    @Override
    public void run(String... args) throws Exception {
        //if users table are empty add the admin
        if (userService.getAll().isEmpty()){
            addUsers();
        }
        //if accounts table are empty add the basic set of account
        if (accountService.getAll().isEmpty()){
            addAccounts();
        }
    }

    private void addUsers() throws Exception {
        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword("admin");
        admin.setRole(Role.ADMIN);
        userService.create(admin);
    }

    private void addAccounts() throws Exception{
        Account asset = new ControlAccount();
        asset.setName("Activo");
        asset.setPlus(true);
        accountService.create(asset,null);

        Account pasivo = new ControlAccount();
        pasivo.setName("Pasivo");
        pasivo.setPlus(false);
        accountService.create(pasivo,null);

        Account patrimonio = new ControlAccount();
        patrimonio.setName("Patrimonio");
        patrimonio.setPlus(false);
        accountService.create(patrimonio,null);

        Account ingresos = new ControlAccount();
        ingresos.setName("Resultado Positivo");
        ingresos.setPlus(false);
        accountService.create(ingresos,null);

        Account egreso = new ControlAccount();
        egreso.setName("Resultado Negativo");
        egreso.setPlus(true);
        accountService.create(egreso,null);
    }
}
