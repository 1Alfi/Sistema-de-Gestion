package com.sistema_contable.sistema.contable.exceptions;

import org.springframework.http.HttpStatus;

public class UsernnameErrorException extends ModelExceptions{
    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.CONFLICT;
    }
}
