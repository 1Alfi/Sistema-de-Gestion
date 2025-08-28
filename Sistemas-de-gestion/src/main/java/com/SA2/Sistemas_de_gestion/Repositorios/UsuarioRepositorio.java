package com.SA2.Sistemas_de_gestion.Repositorios;

import org.springframework.stereotype.Repository;

import com.SA2.Sistemas_de_gestion.Entidades.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;



@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario, String> {

    @Query("SELECT u FROM Usuario u WHERE u.usuario = :usuario")
    Usuario burcarPorNombreUsuario(@Param("usuario")String nombreUsuario);
    

}
