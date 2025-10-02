package com.sistema_contable.sistema.contable.dto;

import java.util.List;

public class AccountResponseDTO {

    private Long id;
    private String code;
    private String name;
    private List<AccountResponseDTO> childAccounts;


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

    public List<AccountResponseDTO> getChildAccounts() {return childAccounts;}

    public void setChildAccounts(List<AccountResponseDTO> childAccounts) {this.childAccounts = childAccounts;}
}
