package com.sistema_contable.sistema.contable.exceptions;

import org.springframework.http.HttpStatus;

public class AuthenticationException extends ModelExceptions{
    public AuthenticationException(String message) {
        super(message);
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.UNAUTHORIZED;
    }
}
