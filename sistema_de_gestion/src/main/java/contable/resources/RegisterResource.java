package contable.resources;

import contable.dto.UserRequestDTO;
import contable.model.User;
import contable.services.UserService;
import contable.util.JwtTokenUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/register")
@CrossOrigin(origins = "http://localhost:3000")
public class RegisterResource {

    //dependencies
    @Autowired
    private UserService service;
    @Autowired
    private JwtTokenUtil tokenUtil;
    @Autowired
    private ModelMapper mapper;

    @PostMapping
    public ResponseEntity<?> register(@RequestBody UserRequestDTO userDTO){
        try{
            service.create(mapper.map(userDTO, User.class));
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
