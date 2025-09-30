package com.sistema_contable.sistema.contable.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@DiscriminatorValue("control")
public class ControlAccount extends Account{


    @OneToMany(mappedBy = "control_account_id",fetch = FetchType.EAGER ,cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Account> subAccounts;


    //methods
    //children
    public List<Account> getChildAccounts() {return subAccounts;}
    public void setChildAccounts(List<Account> childAccounts) {this.subAccounts = childAccounts;}

    public void addChildren(Account children){
        if(this.getChildAccounts() == null){
            List<Account> subAccounts = new ArrayList<Account>();
            this.setChildAccounts(subAccounts);
        }
        else{this.getChildAccounts().add(children);}
        }

    public void deleteChildren(Account children){this.getSubAccounts().remove(children);}

    //abstract methods
    @Override
    public List<Account> getSubAccounts(){
        return this.getChildAccounts();
    }

    //secondary methods
}
