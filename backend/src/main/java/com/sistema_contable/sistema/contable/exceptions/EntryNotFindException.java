package com.sistema_contable.sistema.contable.exceptions;

import org.springframework.http.HttpStatus;

public class EntryNotFindException extends ModelExceptions {

    public EntryNotFindException(String message) {
        super(message);
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_FOUND;
    }
}
