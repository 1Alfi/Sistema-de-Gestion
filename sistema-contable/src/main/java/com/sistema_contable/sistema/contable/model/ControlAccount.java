package com.sistema_contable.sistema.contable.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@DiscriminatorValue("control")
public class ControlAccount extends Account{

    @OneToMany(mappedBy = "control_account_id",fetch = FetchType.EAGER ,cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Account> childAccounts;


    //methods
    public List<Account> getChildAccounts() {return childAccounts;}
    public void setChildAccounts(List<Account> childAccounts) {this.childAccounts = childAccounts;}

    public void addChildren(Account children){
        this.getChildAccounts().add(children);
    }

    @Override
    public List<Account> getSubAccounts(){
        return this.getChildAccounts();
    }
}
