package com.sistema_contable.sistema.contable.services.accounting;

import com.sistema_contable.sistema.contable.model.Movement;
import com.sistema_contable.sistema.contable.repository.MovementRepository;
import com.sistema_contable.sistema.contable.services.accounting.interfaces.LedgerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class LedgerServiceImp implements LedgerService {
    //dependencies
    @Autowired
    private MovementRepository  movementRepository;

    public List<Movement> LadgerByAccountBetweem(Long accountID, Date before, Date after)throws Exception{
        return movementRepository.ledgerAccountBetween(accountID, before, after);
    }
}
