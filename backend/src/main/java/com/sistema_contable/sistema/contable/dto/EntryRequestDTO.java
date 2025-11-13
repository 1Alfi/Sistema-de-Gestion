package com.sistema_contable.sistema.contable.dto;

import java.util.List;

public class EntryRequestDTO {

    private String description;
    private List<MovementRequestDTO> movements;


    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public List<MovementRequestDTO> getMovements() {return movements;}
    public void setMovements(List<MovementRequestDTO> movements) {this.movements = movements;}
}
