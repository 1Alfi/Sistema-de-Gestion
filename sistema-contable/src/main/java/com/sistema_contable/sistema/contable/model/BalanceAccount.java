package com.sistema_contable.sistema.contable.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.ArrayList;
import java.util.List;

@Entity
@DiscriminatorValue("balance")
public class BalanceAccount extends Account{

    //abstract methods
    @Override
    public List<Account> getSubAccounts() {return new ArrayList<Account>();}
}

/* 
    account {
        id,    
        name,
        code,
        balance
    }

    balance = account.calcularSaldo();
*/
