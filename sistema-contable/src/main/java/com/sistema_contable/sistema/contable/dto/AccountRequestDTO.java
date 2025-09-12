package com.sistema_contable.sistema.contable.dto;

public class AccountRequestDTO {

    private String code;
    private String name;
    private String type;
    private Long control_account_id;


    public Long getControl_account_id() {return control_account_id;}
    public void setControl_account_id(Long control_account_id) {this.control_account_id = control_account_id;}

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

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
}
