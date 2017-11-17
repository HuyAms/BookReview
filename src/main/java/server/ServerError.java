/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servererror;

import java.io.Serializable;

/**
 *
 * @author HUYTRINH
 */
public class ServerError implements Serializable {
    private int code;
    private String error;

    public ServerError() {
    }

    public ServerError(int code, String error) {
        this.code = code;
        this.error = error;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
