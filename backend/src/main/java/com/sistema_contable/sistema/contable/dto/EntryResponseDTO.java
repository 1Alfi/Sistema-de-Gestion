package com.sistema_contable.sistema.contable.dto;

import java.util.List;

public class EntryResponseDTO {

    private Long id;
    private String date;
    private String description;
    private String userCreator;
    private List<MovementResponseDTO> movementDTOS;


    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getUserCreator() {
        return userCreator;
    }
    public void setUserCreator(String userCreator) {
        this.userCreator = userCreator;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public List<MovementResponseDTO> getMovementDTOS() {
        return movementDTOS;
    }
    public void setMovementDTOS(List<MovementResponseDTO> movementDTOS) {
        this.movementDTOS = movementDTOS;
    }
}
