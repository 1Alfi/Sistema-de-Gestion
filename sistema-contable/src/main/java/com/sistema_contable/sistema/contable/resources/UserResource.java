package com.sistema_contable.sistema.contable.resources;

import com.sistema_contable.sistema.contable.dto.UserRequestDTO;
import com.sistema_contable.sistema.contable.dto.UserResponseDTO;
import com.sistema_contable.sistema.contable.exceptions.ModelExceptions;
import com.sistema_contable.sistema.contable.exceptions.ResourceNotFoundException;
import com.sistema_contable.sistema.contable.model.User;
import com.sistema_contable.sistema.contable.repository.UserRepository;
import com.sistema_contable.sistema.contable.services.UserService;
import com.sistema_contable.sistema.contable.services.security.AuthorizationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
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

    //endpoints
    @PostMapping(path = "/create")
    public ResponseEntity<?> create(@RequestHeader("Authorization") String token, @RequestBody UserRequestDTO userDTO) {
        try {
            //Verifica si el user del token es admin y lo retorna para verificar que admin en la db en el service
            User userDB = authService.adminAuthorize(token);
            service.create(mapper.map(userDTO, User.class), userDB);
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

   @GetMapping(path = "/usuarios", produces = "application/json")
    public ResponseEntity<?> getUsers(@RequestHeader("Authorization") String token){
        try {
            //Verifica si el user del token es admin y lo retorna para verificar que admin en la db en el service
            User userDB = authService.adminAuthorize(token);
            return new ResponseEntity<>(userResponse(service.getAll()), HttpStatus.OK);
        } catch (ModelExceptions exception) {
            return new ResponseEntity<>(null, exception.getHttpStatus());
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //secondary methods
    //create the body for the response and map the Users
    private MultiValueMap<String, UserResponseDTO> userResponse(User user) {
        MultiValueMap<String, UserResponseDTO> response = new LinkedMultiValueMap<>();
        response.add("User", mapper.map(user, UserResponseDTO.class));
        return response;
    }
    //create... and map a list of Users
    private List<UserResponseDTO> userResponse(List<User> users) {
        MultiValueMap<String, List<UserResponseDTO>> response = new LinkedMultiValueMap<>();
        List<UserResponseDTO> dtos = users.stream().map(user-> mapper.map(user, UserResponseDTO.class)).toList();
        response.add("Users", dtos);
        return dtos;

    }


    //in development
    @Autowired
    private UserRepository repository;

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarUsuario(@PathVariable Long id) {
        System.out.print("user --as-d-asd id:" + id);
        User usuarioExistente = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El usuario con ese id no existe"));

        repository.delete(usuarioExistente);
        Map<String, Boolean> response = new HashMap<>();
        response.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }


}
