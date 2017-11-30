/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;

import java.io.Serializable;

/**
 *
 * @author HUYTRINH
 */
public class PostResponse implements Serializable{
    private Post post;
    private int numberOfLike;
    private int numberOfComment;

    public PostResponse() {
    }

    public PostResponse(Post post, int numberOfLike, int numberOfComment) {
        this.post = post;
        this.numberOfLike = numberOfLike;
        this.numberOfComment = numberOfComment;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public int getNumberOfLike() {
        return numberOfLike;
    }

    public void setNumberOfLike(int numberOfLike) {
        this.numberOfLike = numberOfLike;
    }

    public int getNumberOfComment() {
        return numberOfComment;
    }

    public void setNumberOfComment(int numberOfComment) {
        this.numberOfComment = numberOfComment;
    }
}
