/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities.service;

import entities.Comment;
import entities.Post;
import entities.User;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import utilities.ErrorUtil;
import utilities.TextUtil;
import utilities.TokenUtil;

/**
 *
 * @author HUYTRINH
 */
@Stateless
@Path("comments")
public class CommentFacadeREST extends AbstractFacade<Comment> {

    @PersistenceContext(unitName = "com.thmreview_BookReview_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    public CommentFacadeREST() {
        super(Comment.class);
    }

//    @POST
//    @Path("{postId}")
//    @Produces({MediaType.APPLICATION_JSON})
//    @Consumes({MediaType.APPLICATION_JSON})
//    public Response create(
//            @HeaderParam("authorization") String token,
//            @PathParam("postId") Long postId,
//            @QueryParam("content") String content 
//    ) {
//        Long userId = TokenUtil.decodeToken(token);
//        
//        if (userId != null) {
//            Comment comment = new Comment();
//            Post post = em.find(Post.class, postId);
//            User user = em.find(User.class, userId);
//            
//            if (postId == null) {
//                return Response.status(Response.Status.NOT_FOUND)
//                    .entity(ErrorUtil.notFound("Invalid token"))
//                    .build();
//            }
//            
//            if (userId == null) {
//                return Response.status(Response.Status.NOT_FOUND)
//                    .entity(ErrorUtil.notFound("Invalid token"))
//                    .build();
//            }
//            
//            if (TextUtil.isEmpty(content)) {
//                return Response.status(Response.Status.BAD_REQUEST)
//                    .entity(ErrorUtil.badRequest("Field should not be empty"))
//                    .build();
//            }    
//            
//            System.out.println("user: " + user);
//            System.out.println("post: " + post);
//            System.out.println("content: " + content);
//            
//            comment.setUserUid(user);
//            comment.setPostPostid(post);
//            comment.setContent(content);
//            
//            super.create(comment);
//            
//            return Response.ok(comment).build();
//            
//        } else {
//            return Response.status(Response.Status.UNAUTHORIZED)
//                    .entity(ErrorUtil.unAuthorized("Invalid token"))
//                    .build();
//        }
//    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Long id, Comment entity) {
        super.edit(entity);
    }

//    @DELETE
//    @Produces({MediaType.APPLICATION_JSON})
//    @Path("{id}")
//    public Response remove(@HeaderParam("authorization") String token, @PathParam("id") Long id) {
//        Long userId = TokenUtil.decodeToken(token);
//        if (userId != null) {
//            Comment comment = super.find(id);
//            if (comment != null) {
//                super.remove(comment);
//                return Response.ok(comment).build();
//            } else {
//                return Response.status(Response.Status.NOT_FOUND)
//                    .entity(ErrorUtil.notFound("Cannot find comment with that id"))
//                    .build();
//            }
//            
//        } else {
//            return Response.status(Response.Status.UNAUTHORIZED)
//                    .entity(ErrorUtil.unAuthorized("Invalid token"))
//                    .build();
//        }
//    }
    
//    @GET
//    @Path("{postId}")
//    @Produces({MediaType.APPLICATION_JSON})
//    @Consumes({MediaType.APPLICATION_JSON})
//    public Response getPostComments(@HeaderParam("authorization") String token, @PathParam("postId") Long postId) {
//        Long userId = TokenUtil.decodeToken(token);
//        if (userId != null) {
//            List<Comment> comments = super.findAll();
//            List<Comment> postComments = new ArrayList();
//            for(Comment comment: comments) {
//                if (comment.getPostPostid().getPostid() == postId) {
//                    postComments.add(comment);
//                }
//            }
//            GenericEntity<List<Comment>> entities = new GenericEntity<List<Comment>>(postComments) {};
//            return Response.ok(postComments).build();
//        } else {
//            return Response.status(Response.Status.UNAUTHORIZED)
//                    .entity(ErrorUtil.unAuthorized("Invalid token"))
//                    .build();
//        }
//    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Comment find(@PathParam("id") Long id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Comment> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Comment> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces(MediaType.TEXT_PLAIN)
    public String countREST() {
        return String.valueOf(super.count());
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    
}
