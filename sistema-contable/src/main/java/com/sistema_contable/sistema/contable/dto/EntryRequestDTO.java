package com.sistema_contable.sistema.contable.dto;

public class EntryRequestDTO {


    private String description;
    private String dateCreated;


    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getDateCreated() {
        return dateCreated;
    }
    public void setDateCreated(String dateCreated) {
        this.dateCreated = dateCreated;
    }
}
