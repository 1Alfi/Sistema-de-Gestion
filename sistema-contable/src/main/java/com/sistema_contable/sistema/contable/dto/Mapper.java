package com.sistema_contable.sistema.contable.dto;

import com.sistema_contable.sistema.contable.model.Account;
import com.sistema_contable.sistema.contable.model.Entry;
import com.sistema_contable.sistema.contable.model.Movement;
import org.hibernate.annotations.Comment;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Mapper extends ModelMapper {

    //constructor
    public Mapper() {
        configEntry();
        configMovement();
    }

    //custom mapping
    private void configEntry(){
        this.createTypeMap(EntryRequestDTO.class, Entry.class)
                .addMapping(src -> src.getMovements(),(dto, v) -> dto.setMovements((List<Movement>)v));
    }

    private void configMovement(){
        this.createTypeMap(MovementRequestDTO.class, Movement.class)
                .addMapping(dto -> dto.getAccount(), (movement, v)->movement.getAccount().setId((Long)v));
    }
}
