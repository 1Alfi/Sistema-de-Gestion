package com.sistema_contable.sistema.contable.exceptions;

import org.springframework.http.HttpStatus;

public class BadEntryException extends ModelExceptions {

    public BadEntryException(String message) {
        super(message);
    }

    @Override
    public HttpStatus getHttpStatus() {return HttpStatus.BAD_REQUEST;}
}
