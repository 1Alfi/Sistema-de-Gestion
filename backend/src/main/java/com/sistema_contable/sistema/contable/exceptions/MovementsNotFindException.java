package com.sistema_contable.sistema.contable.exceptions;

import org.springframework.http.HttpStatus;

public class MovementsNotFindException extends ModelExceptions {

    public MovementsNotFindException(String message) {
        super(message);
    }

    @Override
    public HttpStatus getHttpStatus() {
        return  HttpStatus.NOT_FOUND;
    }
}
