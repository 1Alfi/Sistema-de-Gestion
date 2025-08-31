package contable.resources;

import contable.exceptions.ModelExceptions;
import contable.model.User;
import contable.services.security.AuthenticationService;
import contable.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginResource {

    //dependencies
    @Autowired
    private UserService service;
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping
    public ResponseEntity<?> login(AuthenticationService authDTO){
        try {
            String token = authenticationService.authenticate(mapper.map(authDTO, User.class));
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return new ResponseEntity<>(response, null, HttpStatus.OK);
        } catch (ModelExceptions exception) {
            return new ResponseEntity<>(null, exception.getHttpStatus());
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
