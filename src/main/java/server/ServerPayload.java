/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package server;

import java.io.Serializable;

/**
 *
 * @author HUYTRINH
 */
public class ServerPayload<T> implements Serializable {
    private int code;
    private T data;

    public ServerPayload(int code, T data) {
        this.code = code;
        this.data = data;
    }

    public ServerPayload() {
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
