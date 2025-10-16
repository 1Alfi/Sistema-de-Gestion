package com.sistema_contable.sistema.contable.services.accounting.interfaces;

import com.sistema_contable.sistema.contable.model.Movement;

import java.util.Date;
import java.util.List;

public interface LedgerService {
    public List<Movement> LadgerByAccountBetweem(Long accountID, Date before, Date after)throws Exception;
}
