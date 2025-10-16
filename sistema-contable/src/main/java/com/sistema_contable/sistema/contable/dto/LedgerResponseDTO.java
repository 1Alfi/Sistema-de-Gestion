package com.sistema_contable.sistema.contable.dto;

import com.sistema_contable.sistema.contable.model.Movement;

import java.util.List;

public class LedgerResponseDTO {
    private String initialBalance;
    private List<MovementResponseDTO> movements;

    public String getInitialBalance() {return initialBalance;}
    public void setInitialBalance(String initialBalance) {this.initialBalance = initialBalance;}

    public  List<MovementResponseDTO> getMovements() {return movements;}
    public  void setMovements(List<MovementResponseDTO> movements) {this.movements = movements;}
}
