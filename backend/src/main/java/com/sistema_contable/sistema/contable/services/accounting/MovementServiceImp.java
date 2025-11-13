package com.sistema_contable.sistema.contable.services.accounting;

import com.sistema_contable.sistema.contable.model.Account;
import com.sistema_contable.sistema.contable.repository.MovementRepository;
import com.sistema_contable.sistema.contable.services.accounting.interfaces.MovementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovementServiceImp implements MovementService {
    //dependencies
    @Autowired
    private MovementRepository repository;

    //methods
    public boolean existMovementByAccount(Account account)throws Exception{
        return repository.existsByAccountId(account.getId());
    }

}
