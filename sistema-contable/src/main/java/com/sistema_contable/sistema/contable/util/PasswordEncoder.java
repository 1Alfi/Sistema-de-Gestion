package com.sistema_contable.sistema.contable.util;

import com.password4j.BcryptFunction;
import com.password4j.Password;
import com.password4j.types.Bcrypt;


public class PasswordEncoder {

    private final String SHARED_SECRET = "SOII2024";
    private final int LOG_ROUNDS = 12;
    
    //Methods
    public String encode(String rawPassword){
        BcryptFunction bcrypt = BcryptFunction.getInstance(Bcrypt.B, LOG_ROUNDS);
        return Password.hash(rawPassword).addPepper(SHARED_SECRET).with(bcrypt).getResult();
    }

    public boolean verify(String rawPassword,String encodedPassword){
        BcryptFunction bcrypt = BcryptFunction.getInstance(Bcrypt.B, LOG_ROUNDS);
        return Password.check(rawPassword, encodedPassword).addPepper(SHARED_SECRET).with(bcrypt);
    }
}
