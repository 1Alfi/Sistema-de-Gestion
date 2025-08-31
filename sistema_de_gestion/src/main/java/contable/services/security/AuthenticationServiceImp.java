package contable.services.security;

import contable.exceptions.AuthenticationException;
import contable.model.User;
import contable.services.UserService;
import contable.util.JwtTokenUtil;
import contable.util.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImp implements AuthenticationService{

    //dependencies
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;


    //methods
    @Override
    public String authenticate(User user) throws Exception {
        User userDB = userService.findByUsername(user.getUsername());
        if(userDB==null || !passwordEncoder.verify(user.getPassword(), userDB.getPassword())){throw new AuthenticationException();}
        else{return jwtTokenUtil.generateToken(user.getUsername(), user.getRole().name());}
    }
}
