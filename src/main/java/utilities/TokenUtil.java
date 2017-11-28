/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utilities;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;
import java.io.UnsupportedEncodingException;
import java.util.Date;

/**
 *
 * @author HUYTRINH
 */
public class TokenUtil {
    private static final int EXPIRE_TIME = 864000000; //10 days
    public static String createToken(String userId) {
        try {
            Algorithm algorithm = Algorithm.HMAC256("huydeptrai");
                String token = JWT.create()
                    .withExpiresAt(new Date(EXPIRE_TIME + System.currentTimeMillis()))
                    .withIssuer(userId)
                    .sign(algorithm);
            return token;
        } catch (UnsupportedEncodingException exception){
            //UTF-8 encoding not supported
            return null;
        } catch (JWTCreationException exception){
            //Invalid Signing configuration / Couldn't convert Claims.
            return null;
        }
    }
    
    public static Long decodeToken(String token) {
        try {
            System.out.println("token: " + token);
            DecodedJWT jwt = JWT.decode(token);
            String stringId = jwt.getIssuer();
            Long id = Long.parseLong(stringId);
            return id;
        } catch (JWTDecodeException exception){
            //Invalid token
            return null;
        }
    }
}
