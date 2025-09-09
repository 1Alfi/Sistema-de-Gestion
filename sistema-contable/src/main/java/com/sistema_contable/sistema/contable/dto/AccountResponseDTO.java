package com.sistema_contable.sistema.contable.dto;

import com.sistema_contable.sistema.contable.model.AccountType;

public class AccountResponseDTO {

    private Long id;
    private String code;
    private String name;
    private AccountType type;

    public String getCode() {
        return code;
    }
    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public AccountType getType() {
        return type;
    }
    public void setType(AccountType type) {
        this.type = type;
    }
}
