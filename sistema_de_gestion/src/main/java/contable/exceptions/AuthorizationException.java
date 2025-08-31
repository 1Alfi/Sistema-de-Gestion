package contable.exceptions;

import org.springframework.http.HttpStatus;

public class AuthorizationException extends ModelExceptions{

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.UNAUTHORIZED;
    }
}
