package com.sistema_contable.sistema.contable.dto;

public class MovementRequestDTO {

    private Long account;
    private String debit;
    private String credit;


    public String getDebit() {return debit;}
    public void setDebit(String debit) {this.debit = debit;}

    public String getCredit() {return credit;}
    public void setCredit(String credit) {this.credit = credit;}

    public Long getAccount() {return account;}
    public void setAccount(Long account) {this.account = account;}
}
