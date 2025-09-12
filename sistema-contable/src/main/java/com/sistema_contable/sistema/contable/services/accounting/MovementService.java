package com.sistema_contable.sistema.contable.services.accounting;

import com.sistema_contable.sistema.contable.model.Movement;

public interface MovementService {
    public void create(Movement movement) throws Exception;
}
