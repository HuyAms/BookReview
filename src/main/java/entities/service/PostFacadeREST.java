/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities.service;

import entities.Category;
import entities.Post;
import entities.User;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
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
   
//
//    @POST
//    @Consumes({MediaType.APPLICATION_JSON})
//    @Produces({MediaType.APPLICATION_JSON})
//    public Response create(
//            @HeaderParam("authorization") String token,
//            @QueryParam("title") String title, 
//            @QueryParam("author") String author, 
//            @QueryParam("path") String path, 
//            @QueryParam("review") String review,
//            @QueryParam("categories") List<String> categories
//    ) {
//        
//                System.out.println("title: " + title);
//                System.out.println("author: " + author);
//                System.out.println("path: " + path);
//                System.out.println("review: " + review);
//                
//                for(String cat: categories) {
//                    System.out.println("categories: " + categories);
//                }
//                
//                
//        Long id = TokenUtil.decodeToken(token);
//        if (id != null) {
//            Post post = new Post();
//            
//            if (TextUtil.isEmpty(title, author, path, review) || categories.size() == 0) {
//                return Response.status(Response.Status.BAD_REQUEST)
//                     .entity(ErrorUtil.badRequest("Field should not be empty"))
//                    .build();
//            } else {
//                
////                Book info
//                post.setBookAuthor(author);
//                post.setBookTitle(title);
//                post.setPath(path);
//                post.setReview(review);
//                post.setTimestamp(new Date());
////
////                //User
//                User user = em.find(User.class, id);
//                post.setUserUid(user);
////
////               //Get category list
//                javax.persistence.criteria.CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
//                cq.select(cq.from(Category.class));
//                List<Category> listCategory = em.createQuery(cq).getResultList();
//                
//                for(String category: categories) {
//                    if(!listCategory.contains(category)) {
//                        return Response.status(Response.Status.BAD_REQUEST)
//                        .entity(ErrorUtil.badRequest("Field should not be empty"))
//                        .build();
//                    } else {
//                        
//                    }
//                }
//                
//                post.setCategoryCollection(categories);
//                super.create(post);
////                
//                Post newPost = super.findNewest();
//                return Response.ok(newPost).build();
//            }
////            
//        } else {
//            return Response.status(Response.Status.UNAUTHORIZED)
//                     .entity(ErrorUtil.unAuthorized("Invalid token"))
//                    .build();
//        }
//    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Long id, Post entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Long id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Post find(@PathParam("id") Long id) {
        return super.find(id);
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
