package com.sistema_contable.sistema.contable.services.accounting.interfaces;

import com.sistema_contable.sistema.contable.model.Account;
import com.sistema_contable.sistema.contable.model.Movement;

import java.util.List;

public interface MovementService {
    public boolean existMovementByAccount(Account account)throws Exception;
}
