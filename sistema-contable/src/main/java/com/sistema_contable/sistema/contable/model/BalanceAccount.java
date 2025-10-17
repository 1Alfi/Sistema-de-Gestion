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

    @Override
    public String getType() {
        return "Balance";
    }

    @Override
    public void desactivate() {
        this.setActive(false);
    }

    @Override
    public void activate() {
        this.setActive(true);
    }

}
