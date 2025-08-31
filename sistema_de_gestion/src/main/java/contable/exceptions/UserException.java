package contable.exceptions;

import org.springframework.http.HttpStatus;

public class UserException extends ModelExceptions{

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.FORBIDDEN;
    }
}
