package com.SA2.Sistemas_de_gestion.Controladores;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SA2.Sistemas_de_gestion.Entidades.Usuario;
import com.SA2.Sistemas_de_gestion.Excepciones.ResourceNotFoundException;
import com.SA2.Sistemas_de_gestion.Repositorios.UsuarioRepositorio;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/v1")
public class UsuarioControlador {

    private final UsuarioRepositorio usuarioRepositorio;

    UsuarioControlador(UsuarioRepositorio usuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
    }
    
    @GetMapping("/usuarios")
    public List<Usuario> listarUsuarios() {
        return usuarioRepositorio.findAll();
    }

    @PostMapping("/usuarios")
    public Usuario registrarUsuario(@RequestBody Usuario usuario) {
        return usuarioRepositorio.save(usuario);
    }

    @GetMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> listarUsuarioPorId(@PathVariable String id) {
        Usuario usuario = usuarioRepositorio.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("El usuario con ese id no existe"));

        return ResponseEntity.ok(usuario);
    }


    @PutMapping("usuarios/{id}")
    public ResponseEntity<Usuario> modificarUsuarioPorId(@PathVariable String id, @RequestBody Usuario usuarioRequest) {
        Usuario usuarioExistente = usuarioRepositorio.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("El usuario con ese id no existe"));

        usuarioExistente.setUsuario(usuarioRequest.getUsuario());
        usuarioExistente.setPassword(usuarioRequest.getPassword());
        usuarioExistente.setRol(usuarioRequest.getRol());

        Usuario usuarioModificado = usuarioRepositorio.save(usuarioExistente);

        return ResponseEntity.ok(usuarioModificado);
    }

    public ResponseEntity<Map<String,Boolean>> eliminarUsuario(@PathVariable String id) {
        Usuario usuarioExistente = usuarioRepositorio.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("El usuario con ese id no existe"));

        usuarioRepositorio.delete(usuarioExistente);

        Map<String, Boolean> response = new HashMap<>();
        response.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
