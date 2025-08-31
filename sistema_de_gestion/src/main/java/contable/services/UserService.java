package contable.services;

import contable.model.User;

public interface UserService {
    public void create(User user);
    public User findByUsername(String username);
}
