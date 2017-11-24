/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;

import java.io.Serializable;
import java.util.List;

/**
 *
 * @author HUYTRINH
 */
public class Test implements Serializable{
    private String content;
    private List<String> list;

    public Test() {
    }

    public Test(String content, List<String> list) {
        this.content = content;
        this.list = list;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<String> getList() {
        return list;
    }

    public void setList(List<String> list) {
        this.list = list;
    }

   
    
    
}
