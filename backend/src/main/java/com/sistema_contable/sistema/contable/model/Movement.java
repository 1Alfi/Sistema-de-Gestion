package com.sistema_contable.sistema.contable.model;

import jakarta.persistence.*;

@Entity
@Table(name = "movements")
public class Movement{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_movement")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "movement_account_id")
    private BalanceAccount account;

    @Column(name = "debit")
    private Double debit;

    @Column(name = "credit")
    private Double credit;

    @ManyToOne
    @JoinColumn(name = "movement_entry_id")
    private Entry entry;

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
    public void setAccount(BalanceAccount account) {
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
    public Entry getEntry() {
        return entry;
    }
    public void setEntry(Entry entry_id) {
        this.entry = entry_id;
    }

    //account balance
    public Double getAccountBalance() {
        return accountBalance;
    }
    public void setAccountBalance(Double accountBalance) {
        this.accountBalance = accountBalance;
    }

    //SECONDARY METHODS
    public void addAccountBalance(Double balance) {
        if(this.getAccount().isPlus()){

            this.setAccountBalance(balance+this.getDebit()-this.getCredit());
        }
        else {
            this.setAccountBalance(balance+this.getCredit()-this.getDebit());}
    }

    public boolean balanceEnough(Double balance){
        if(this.getAccount().isPlus()){
            return !(balance < this.getCredit());
        }
        else {
            return !(balance < this.getDebit());
        }
    }
}
