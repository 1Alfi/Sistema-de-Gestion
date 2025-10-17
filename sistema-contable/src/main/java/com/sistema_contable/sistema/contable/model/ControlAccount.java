package com.sistema_contable.sistema.contable.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@DiscriminatorValue("control")
public class ControlAccount extends Account {


    @OneToMany(mappedBy = "control_account_id", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Account> subAccounts = new ArrayList<>();

    //methods
    //children

    public List<Account> getChildAccounts() {
        return subAccounts;
    }

    public void setChildAccounts(List<Account> childAccounts) {
        this.subAccounts = childAccounts;
    }

    //add children
    public void addChildren(Account children) {
        //set variables to do the code more readable
        String ownCode = this.getCode();
        List<Account> childAccounts = this.getChildAccounts();
        Account father = this.getControl_account_id();
        //set the children
        children.setControl_account_id(this);
        this.getChildAccounts().add(children);
        children.setCode(this.getCode() + '.' + this.getChildAccounts().size());
    }

    //delete children
    public void deleteChildren(Account children) {
        this.getSubAccounts().remove(children);
    }

    //abstract methods
    @Override
    public String getType() {
        return "Control";
    }

    @Override
    public void desactivate() {
        if(this.getChildAccounts().isEmpty()){
            this.setActive(false);
        }
        else {
            for(Account childAccount : this.getChildAccounts()){
                childAccount.desactivate();
            }
        }
    }

    @Override
    public List<Account> getSubAccounts() {
        return this.getChildAccounts();
    }
}