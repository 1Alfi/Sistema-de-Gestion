package contable.exceptions;

import org.springframework.http.HttpStatus;

public abstract class ModelExceptions extends Exception{
    public abstract HttpStatus getHttpStatus();
}
