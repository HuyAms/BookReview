/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utilities;

import servererror.ServerError;

/**
 *
 * @author HUYTRINH
 */
public class ErrorUtil {
    public static ServerError badRequest(String error) {
        return new ServerError(400, error);
    } 
    
    public static ServerError unAuthorized(String error) {
        return new ServerError(401, error);
    }
    
    public static ServerError forbidden(String error) {
        return new ServerError(403, error);
    }
    
    public static ServerError notFound(String error) {
        return new ServerError(400, error);
    }
    
    public static ServerError methodNotAllowed(String error) {
        return new ServerError(405, error);
    }
    
    public static ServerError notAcceptable(String error) {
        return new ServerError(406, error);
    }
    
    public static ServerError notSupported(String error) {
        return new ServerError(415, error);
    }
    public static ServerError internalServerError() {
        return new ServerError(500, "General server error");
    }
    
    public static ServerError serviceUnavailable() {
        return new ServerError(503, "Server is temporarily unavailable or busy");
    }
    
}
