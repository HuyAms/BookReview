/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utilities;

import server.ServerPayload;

/**
 *
 * @author HUYTRINH
 */
public class ServerPayloadUtil {
    
    public static <T> ServerPayload setPayLoad(T data) {
        ServerPayload serverPayload = new ServerPayload(200, data);
        return serverPayload;
    }
}
