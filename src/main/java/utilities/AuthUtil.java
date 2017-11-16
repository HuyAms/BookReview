/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utilities;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import java.io.UnsupportedEncodingException;

/**
 *
 * @author HUYTRINH
 */
public class AuthUtil {
    public static String createToken(String userId) {
        try {
            Algorithm algorithm = Algorithm.HMAC256("huydeptrai");
                String token = JWT.create()
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
}
