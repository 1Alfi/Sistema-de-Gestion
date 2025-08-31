package contable.services.security;

import contable.model.User;

public interface AuthenticationService {
    public String authenticate(User user) throws Exception;
}
