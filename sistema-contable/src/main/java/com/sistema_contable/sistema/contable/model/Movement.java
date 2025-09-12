package com.sistema_contable.sistema.contable.model;

import jakarta.persistence.*;

@Entity
@Table(name = "movement")
public class Movement{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_line")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "line_account_id")
    private Account account;

    @Column(name = "debit")
    private Double debit;

    @Column(name = "credit")
    private Double credit;

    @ManyToOne
    @JoinColumn(name = "entry_id")
    private Entry entry_id;

    @Column(name = "account_balance")
    private Double accountBalance;


    //id
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    //account
    public Account getAccount() {
        return account;
    }
    public void setAccount(Account account) {
        this.account = account;
    }

    //debit
    public double getDebit() {
        return debit;
    }
    public void setDebit(double debit) {
        this.debit = debit;
    }

    //credit
    public double getCredit() {
        return credit;
    }
    public void setCredit(double credit) {
        this.credit = credit;
    }

    //entry
    public Entry getEntry_id() {
        return entry_id;
    }
    public void setEntry_id(Entry entry_id) {
        this.entry_id = entry_id;
    }

    //account balance
    public Double getAccountBalance() {
        return accountBalance;
    }
    public void setAccountBalance(Double accountBalance) {
        this.accountBalance = accountBalance;
    }
}
