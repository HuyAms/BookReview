/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities.service;

import entities.Category;
import entities.Comment;
import entities.Post;
import entities.PostBody;
import entities.Rate;
import entities.User;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.CascadeType;
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
import utilities.JsonUtil;
import utilities.TextUtil;
import utilities.TokenUtil;

/**
 *
 * @author HUYTRINH
 */
@Stateless
@Path("posts")
public class PostFacadeREST extends AbstractFacade<Post> {

    @PersistenceContext(unitName = "com.thmreview_BookReview_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    public PostFacadeREST() {
        super(Post.class);
    }
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("test")
    public void test(
            @QueryParam("title") String title, 
            @QueryParam("author") String author, 
            @QueryParam("path") String path
    ) {
                System.out.println("title: " + title);
                System.out.println("author: " + author);
                System.out.println("path: " + path);
          
    }
   

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response create(
            @HeaderParam("authorization") String token,
            PostBody postBody
    ) {
        
                System.out.println("title: " + postBody.getTitle());
                System.out.println("author: " + postBody.getAuthor());
                System.out.println("path: " + postBody.getPath());
                System.out.println("review: " + postBody.getReview());
                
                System.out.println("categories: " + postBody.getCategories());
                
                String title = postBody.getTitle();
                String author = postBody.getAuthor();
                String path = postBody.getPath();
                String review = postBody.getReview();
                List<String> categories = postBody.getCategories();
                
        Long id = TokenUtil.decodeToken(token);
        if (id != null) {
            Post post = new Post();
            if (TextUtil.isEmpty(title, author, path, review) || categories.size() == 0) {
                return Response.status(Response.Status.BAD_REQUEST)
                     .entity(ErrorUtil.badRequest("Field should not be empty"))
                    .build();
            } else {
                
//                Book info
                post.setBookAuthor(author);
                post.setBookTitle(title);
                post.setPath(path);
                post.setReview(review);
                post.setTimestamp(new Date());
               
                
                //Category
                List<Category> bookCategories = new ArrayList();
                List<Category> availableCategories = em.createNamedQuery("Category.findAll").getResultList();
                boolean validCategory = false;
                
                for(String category: categories) {
                    validCategory = false;
                    for(Category availableCategory: availableCategories) {
                        System.out.println("availableCategory: " + availableCategory.getCategory());
                        System.out.println("category: " + category);
                       
                        if (availableCategory.getCategory().equals(category)) {
                            validCategory = true;
                            System.out.println("valid: " + validCategory);
                            bookCategories.add(availableCategory);              
                        } 
                    }
                    
                    if (!validCategory) {
                        return Response.status(Response.Status.BAD_REQUEST)
                                    .entity(ErrorUtil.badRequest("Wrong category"))
                                    .build();
                    }
                }
                
                for(Category category: bookCategories) {
                    post.addCategory(category);
                }
                
                
//                post.setCategoryCollection(bookCategories);
//                List<Category> setCategoires = post.getCategoryCollection();
//                for (Category category: setCategoires) {
//                    System.out.println("setCategories: " + category);
//                }
                
                
                
                //User
                User user = em.find(User.class, id);
                if (user == null) {
                    return Response.status(Response.Status.NOT_FOUND)
                     .entity(ErrorUtil.notFound("Cannot find user with that id"))
                    .build();
                }
                post.setUserUid(user);
                
                super.create(post);
               
                Post newPost = super.findNewest();
                return Response.ok(newPost).build();
            }            
        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                     .entity(ErrorUtil.unAuthorized("Invalid token"))
                    .build();
        }
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Long id, Post entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response remove(@HeaderParam("authorization") String token, @PathParam("id") Long id) {
        Long userId = TokenUtil.decodeToken(token);
        if (userId != null) {
            System.out.println("delete post");
            Post post = super.find(id);
            if (post == null) {
                return Response.status(Response.Status.NOT_FOUND)
                    .entity(ErrorUtil.notFound("Cannot find post with that Id"))
                    .build();
            } else {
                super.remove(super.find(id));
                return Response.ok(post).build();
            }
        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity(ErrorUtil.unAuthorized("Invalid token"))
                    .build();
        }
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response find(@HeaderParam("authorization") String token, @PathParam("id") Long id) {
        System.out.println("postid: " + id);
        Long userId = TokenUtil.decodeToken(token);
        if (userId != null) {
            Post post = super.find(id);
            if (post == null) {
                 return Response.status(Response.Status.NOT_FOUND)
                    .entity(ErrorUtil.notFound("Cannot find the post with that id"))
                    .build();
            } else {
                return Response.ok(post).build();
            } 
        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity(ErrorUtil.unAuthorized("Invalid token"))
                    .build();
        }
    }

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Response findAll(@HeaderParam("authorization") String token) {
        Long id = TokenUtil.decodeToken(token);
        if (id != null) {
            List<Post> posts = super.findAll();
            GenericEntity<List<Post>> entities = new GenericEntity<List<Post>>(posts) {};
            return Response.status(Response.Status.OK)
                    .entity(entities)
                    .build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity(ErrorUtil.unAuthorized("Invalid token"))
                    .build();
        }
    }
    
    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Post> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
