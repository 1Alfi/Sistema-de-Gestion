package com.sistema_contable.sistema.contable.exceptions;

import org.springframework.http.HttpStatus;

public class AccountNotFindException extends ModelExceptions{
    public AccountNotFindException(String message) {
        super(message);
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.BAD_REQUEST;
    }
}
