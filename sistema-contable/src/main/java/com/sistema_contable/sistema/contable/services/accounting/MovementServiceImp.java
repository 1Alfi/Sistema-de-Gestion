package com.sistema_contable.sistema.contable.services.accounting;

import com.sistema_contable.sistema.contable.model.Account;
import com.sistema_contable.sistema.contable.model.Movement;
import com.sistema_contable.sistema.contable.repository.MovementRepository;
import com.sistema_contable.sistema.contable.services.accounting.interfaces.MovementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovementServiceImp implements MovementService {
    //dependencies
    @Autowired
    private MovementRepository repository;

    //methods
    public List<Movement> getMovementsByAccount(Account account)throws Exception{
        return repository.oneMovementByAccount(account.getId());
    }

}
