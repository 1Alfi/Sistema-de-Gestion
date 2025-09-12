package com.sistema_contable.sistema.contable.exceptions;

import com.sistema_contable.sistema.contable.dto.AccountRequestDTO;
import com.sistema_contable.sistema.contable.model.BalanceAccount;
import com.sistema_contable.sistema.contable.model.ControlAccount;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class Mapper extends ModelMapper {

    //constructor
    public Mapper() {
        configSongResponse();
        configasdSongResponse();
    }

    //custom mapping
    private void configSongResponse(){
        this.createTypeMap(AccountRequestDTO.class, BalanceAccount.class)
                .addMapping(src -> src.getControl_account_id() ,(dto, v) -> dto.getControl_account_id().setId((Long)v));
    }

    private void configasdSongResponse(){
        this.createTypeMap(AccountRequestDTO.class, ControlAccount.class)
                .addMapping(src -> src.getControl_account_id() ,(dto, v) -> dto.getControl_account_id().setId((Long)v));
    }
}