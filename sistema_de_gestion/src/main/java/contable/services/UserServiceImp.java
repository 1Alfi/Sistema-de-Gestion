package contable.services;

import contable.model.User;
import contable.repository.UserRepository;
import contable.util.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;

public class UserServiceImp implements UserService{

    //dependencies
    @Autowired
    private UserRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    //methods
    @Override
    public void create(User user) {
        User userDB = repository.findByUsername(user.getUsername());
        if(userDB!=null){ // username exist dont create user
            //asdasdasdasdasdasdasdasdasd
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        repository.save(user);
    }
    @Override
    public User findByUsername(String username) {
        User userDB = repository.findByUsername(username);
        if(repository.findByUsername(username) == null) {
            //usuario no encontrado
        }
        return userDB;
    }
}
