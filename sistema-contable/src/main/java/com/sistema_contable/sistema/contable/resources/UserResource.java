package com.sistema_contable.sistema.contable.resources;

import com.sistema_contable.sistema.contable.dto.AuthenticationRequestDTO;
import com.sistema_contable.sistema.contable.dto.UserRequestDTO;
import com.sistema_contable.sistema.contable.exceptions.ResourceNotFoundException;
import com.sistema_contable.sistema.contable.exceptions.UserNotFindException;
import com.sistema_contable.sistema.contable.model.User;
import com.sistema_contable.sistema.contable.repository.UserRepository;
import com.sistema_contable.sistema.contable.services.UserService;
import com.sistema_contable.sistema.contable.services.security.AuthenticationService;
import com.sistema_contable.sistema.contable.services.security.AuthorizationService;
import com.sistema_contable.sistema.contable.util.JwtTokenUtil;
import com.sistema_contable.sistema.contable.util.PasswordEncoder;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserResource {

    //dependencies
    @Autowired
    private UserService service;
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private AuthorizationService authService;

    @PostMapping(path = "/create")
    public ResponseEntity<?> create (@RequestHeader("Authorization") String token,@RequestBody UserRequestDTO userDTO){
        try{
            System.out.print(token);
            User userDB = authService.adminAuthorize(token);
            service.create(mapper.map(userDTO, User.class), userDB);
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    //In development
    @Autowired
    private UserRepository repository;

    @GetMapping("/usuarios")
    public List<User> listarUsuarios() {
        return repository.findAll();
    }

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarUsuario(@PathVariable Long id) {
        System.out.print("user --as-d-asd id:"+id);
        User usuarioExistente = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El usuario con ese id no existe"));

        repository.delete(usuarioExistente);
        Map<String, Boolean> response = new HashMap<>();
        response.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
