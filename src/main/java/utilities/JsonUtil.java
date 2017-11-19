/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utilities;

/**
 *
 * @author HUYTRINH
 */
public class JsonUtil {
    public static String jsonToken(String tag, String data) {
//       return "{\"token\":\""+token+"\"}" ;
       return "{\"" + tag + "\":" + "\"" + data + "\"}";
   }
}
