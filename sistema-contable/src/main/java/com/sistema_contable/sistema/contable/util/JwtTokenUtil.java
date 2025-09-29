package com.sistema_contable.sistema.contable.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.sistema_contable.sistema.contable.exceptions.AuthorizationException;

import java.util.Date;

public class JwtTokenUtil {

    public static final String SECRET = "SOII2025";
    public static final long EXPIRATION_TIME = 86_400_000; // Token expire 1 day after
    public static final String TOKEN_PREFIX = "Bearer ";

    public String generateToken(String subject, String role){
        return TOKEN_PREFIX + JWT.create().withSubject(subject)
                .withClaim("role",role)
                .withExpiresAt(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(SECRET.getBytes()));
    }

    public boolean verify(String token){
        try{
            JWT.require(Algorithm.HMAC512(SECRET.getBytes())).build().verify(token.replace(TOKEN_PREFIX, ""));
            return true;
        }catch (RuntimeException exception){
            return false;
        }
    }

    public String getSubject(String token) throws Exception{
        try {
            return JWT.decode(token.replace(TOKEN_PREFIX, "")).getSubject();
        }catch (Exception e){
            System.out.print("Error searching for subject in the token");
            throw new AuthorizationException();
        }
    }

    public Date getExpirationDate(String token){
        return JWT.decode(token.replace(TOKEN_PREFIX, "")).getExpiresAt();
    }

    public String getRole(String token) {
        return  JWT.decode(token.replace(TOKEN_PREFIX,"")).getClaim("role").asString();
    }
}
