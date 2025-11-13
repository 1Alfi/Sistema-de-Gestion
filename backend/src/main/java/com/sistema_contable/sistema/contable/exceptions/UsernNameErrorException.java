package com.sistema_contable.sistema.contable.exceptions;

import org.springframework.http.HttpStatus;

public class UsernNameErrorException extends ModelExceptions{
    
    public UsernNameErrorException(String message) {
        super(message);
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.CONFLICT;
    }
}
