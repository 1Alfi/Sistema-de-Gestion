package com.sistema_contable.sistema.contable.exceptions;

import org.springframework.http.HttpStatus;

public abstract class ModelExceptions extends Exception{
    
    public ModelExceptions(String message){
        super(message);
    }

    public abstract HttpStatus getHttpStatus();
}
