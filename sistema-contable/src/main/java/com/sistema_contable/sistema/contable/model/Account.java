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

    @Column(name = "account_type")
    @Enumerated(EnumType.STRING)
    private AccountType type;

    @ManyToOne
    @JoinColumn(name = "control_account_id")
    private ControlAccount control_account_id;

    //id
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    //code
    public String   getCode() {
        return code;
    }
    public void setCode(String code) {
        this.code = code;
    }

    //name
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    //type
    public AccountType getType() {
        return type;
    }
    public void setType(AccountType type) {
        this.type = type;
    }

    //control id
    public ControlAccount getControl_account_id() {
        return control_account_id;
    }

    public void setControl_account_id(ControlAccount control_account_id) {
        this.control_account_id = control_account_id;
    }

    //childrens
    public abstract List<Account> getSubAccounts();
}
