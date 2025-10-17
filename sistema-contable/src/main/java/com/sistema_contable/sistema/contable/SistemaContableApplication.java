package com.sistema_contable.sistema.contable;

import com.sistema_contable.sistema.contable.util.DateFormatter;
import com.sistema_contable.sistema.contable.util.JwtTokenUtil;
import com.sistema_contable.sistema.contable.util.PasswordEncoder;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SistemaContableApplication {

	public static void main(String[] args) {
		SpringApplication.run(SistemaContableApplication.class, args);
	}

	@Bean
	public PasswordEncoder PasswordEncoder(){return new PasswordEncoder();}
	@Bean
	public JwtTokenUtil JwtTokenUtil(){return new JwtTokenUtil();}
	@Bean
	public ModelMapper modelMapper(){return new ModelMapper();}
    @Bean
    public DateFormatter dateFormatter(){return new DateFormatter();}

}

