package com.sistema_contable.sistema.contable.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "accounts")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "account_discriminator") //balance or control
public abstract class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_account")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "account_name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "control_account_id")
    private ControlAccount control_account_id;

    @Column(name = "plus")
    private boolean plus;

    @Column(name = "active")
    private boolean active;


    //METHODS
    //id
    public Long getId() {return id;}
    public void setId(Long id) {
        this.id = id;
    }

    //code
    public String   getCode() {return code;}
    public void setCode(String code) {
        this.code = code;
    }

    //name
    public String getName() {return name;}
    public void setName(String name) {
        this.name = name;
    }

    //control id
    public ControlAccount getControl_account_id() {return control_account_id;}
    public void setControl_account_id(ControlAccount control_account_id) {this.control_account_id = control_account_id;}

    //plus
    public boolean isPlus() {return plus;}
    public void setPlus(boolean plus) {this.plus = plus;}

    //active (state of the account)
    public boolean isActive() {return active;}
    public void setActive(boolean active) {this.active = active;}

    //abstract methods
    //childrens
    public abstract List<Account> getSubAccounts();
    public abstract String getType();
    public abstract void desactivate();
    public abstract void activate();
}
