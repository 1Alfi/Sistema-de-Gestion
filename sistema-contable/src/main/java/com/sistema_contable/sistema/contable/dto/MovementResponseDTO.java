package com.sistema_contable.sistema.contable.dto;

public class MovementResponseDTO {

    private Long id;
    private AccountResponseDTO accountDTO;
    private Double debit;
    private Double credit;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public AccountResponseDTO getAccountDTO() {
        return accountDTO;
    }
    public void setAccountDTO(AccountResponseDTO accountDTO) {
        this.accountDTO = accountDTO;
    }

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
}
