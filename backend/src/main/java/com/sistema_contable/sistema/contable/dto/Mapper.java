package com.sistema_contable.sistema.contable.dto;

import com.sistema_contable.sistema.contable.model.Account;
import com.sistema_contable.sistema.contable.model.Entry;
import com.sistema_contable.sistema.contable.model.Movement;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Mapper extends ModelMapper {

    //constructor
    public Mapper() {
        configEntry();
        configMovement();
        configEntryDTO();
        configMovementDTO();
        configAccountDTO();
        configMovementLedgerDTO();
    }

    //custom mapping
    private void configEntry(){
        this.createTypeMap(EntryRequestDTO.class, Entry.class)
                .addMapping(dto -> dto.getMovements(),(entry, v) -> entry.setMovements((List<Movement>)v));
    }

    private void configEntryDTO(){
        this.createTypeMap(Entry.class, EntryResponseDTO.class)
                .addMapping(entry -> entry.getMovements(), (dto, v)->dto.setMovementDTOS((List<MovementResponseDTO>) v))
                .addMapping(entry -> entry.getUserCreator().getUsername(),(dto, username)->dto.setUserCreator((String) username) );
    }

    private void configMovement(){
        this.createTypeMap(MovementRequestDTO.class, Movement.class)
                .addMapping(dto -> dto.getAccount(), (movement, v)->movement.getAccount().setId((Long)v));
    }

    private void configMovementDTO(){
        this.createTypeMap(Movement.class, MovementResponseDTO.class)
                .addMapping(movement -> movement.getAccount().getName(),(dto, v)->dto.setAccount((String) v))
                .addMapping(movement -> movement.getAccountBalance(),(dto, balance)->dto.setAccount_balance((Double) balance))
                .addMapping(movement -> movement.getEntry().getDateCreated(),(dto,date)->dto.setDateCreated((String) date));
    }

    private void configMovementLedgerDTO(){
        this.createTypeMap(Movement.class, MovementLedgerResponseDTO.class)
                .addMapping(movement -> movement.getAccount().getName(),(dto, v)->dto.setAccount((String) v))
                .addMapping(movement -> movement.getAccountBalance(),(dto, balance)->dto.setAccount_balance((Double) balance))
                .addMapping(movement -> movement.getEntry().getDescription(),(dto,description)->dto.setDescription((String) description))
                .addMapping(movement -> movement.getEntry().getDateCreated(),(dto,date)->dto.setDateCreated((String) date));
    }

    private void configAccountDTO(){
        this.createTypeMap(Account.class, AccountResponseDTO.class)
                .addMapping(account -> account.getType(),(dto,type)->dto.setType((String) type));
    }
}
