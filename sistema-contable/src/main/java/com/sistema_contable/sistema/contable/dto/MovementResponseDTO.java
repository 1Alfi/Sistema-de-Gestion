package com.sistema_contable.sistema.contable.dto;

public class MovementResponseDTO {

    private Long id;
    private String account;
    private Double debit;
    private Double credit;
    private Double account_balance;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getAccount() {return account;}

    public void setAccount(String account) {this.account = account;}

    public Double getDebit() {
        return debit;
    }
    public void setDebit(Double debit) {
        this.debit = debit;
    }

    public Double getCredit() {
        return credit;
    }
    public void setCredit(Double credit) {
        this.credit = credit;
    }

    public Double getAccount_balance() {return account_balance;}
    public void setAccount_balance(Double account_balance) {this.account_balance = account_balance;}
}
