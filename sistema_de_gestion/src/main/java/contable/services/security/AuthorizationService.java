package contable.services.security;

import contable.model.User;

public interface AuthorizationService {
    public User authorize(String token) throws Exception;
}
