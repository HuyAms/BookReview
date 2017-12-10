/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities.service;

import entities.Category;
import entities.Post;
import entities.Rate;
import entities.User;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import utilities.ErrorUtil;
import utilities.JsonUtil;
import utilities.TokenUtil;

/**
 *
 * @author HUYTRINH
 */
@Stateless
@Path("ratings")
public class RateFacadeREST extends AbstractFacade<Rate> {

    @PersistenceContext(unitName = "com.thmreview_BookReview_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    public RateFacadeREST() {
        super(Rate.class);
    }
    
    @POST
    @Path("posts/{postId}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response postRating(
            @HeaderParam("authorization") String token,
            @PathParam("postId") Long postId) {
        Long userId = TokenUtil.decodeToken(token);
        if (userId != null) {
            Rate newRate = new Rate();
            System.out.println("postId: " + postId);
            Post post = em.find(Post.class, postId);
            User user = em.find(User.class, userId);
            System.out.println("post: " + post);
            
            if (post == null) {
                return Response.status(Response.Status.NOT_FOUND)
                    .entity(ErrorUtil.notFound("Cannot find the post with that id"))
                    .build();
            }
            
            if (user == null) {
                return Response.status(Response.Status.NOT_FOUND)
                    .entity(ErrorUtil.notFound("Cannot find user with that id"))
                    .build();
            }
            
            Query query = em.createQuery( "Select r " + "from Rate r "  + "WHERE r.userUid.uid = " + userId + " AND r.postPostid.postid = " + postId);
            List<Rate> rates = (List<Rate>)query.getResultList();
            if (rates.size() == 0) {
                newRate.setUserUid(user);
                newRate.setPostPostid(post);
          
                em.persist(newRate);
            
                return Response.ok(newRate).build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST).entity(ErrorUtil.badRequest("User has rated this post")).build();
            }
        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity(ErrorUtil.unAuthorized("Invalid token"))
                    .build();
        }
    }
    
    @GET
    @Path("posts/{postId}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getRatings(@HeaderParam("authorization") String token, @PathParam("postId") Long postId) {
        Long id = TokenUtil.decodeToken(token);
        if (id != null) {
            Post post = em.find(Post.class, postId);
            if (post == null) {
                 return Response.status(Response.Status.NOT_FOUND)
                    .entity(ErrorUtil.notFound("Cannot find the post with that id"))
                    .build();
            } else {
                List<Rate> ratings = em.createNamedQuery("Rate.findAll").getResultList();
                List<Rate> postRatings = new ArrayList();
                for(Rate rate: ratings) {
                    if (rate.getPostPostid().getPostid() == postId) {
                        postRatings.add(rate);
                    }
                }
                
                String countRating = postRatings.size() + "";
                return Response.ok(JsonUtil.jsonToken("rating", countRating)).build();
            } 
        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity(ErrorUtil.unAuthorized("Invalid token"))
                    .build();
        }
    }
    
    @DELETE
    @Produces({MediaType.APPLICATION_JSON})
    @Path("{id}")
    public Response removeRating(@HeaderParam("authorization") String token, @PathParam("id") Long id) {
        Long userId = TokenUtil.decodeToken(token);
        if (userId != null) {
            Rate rate = em.find(Rate.class, id);
            if (rate != null) {
                em.remove(em.merge(rate));
                return Response.ok(rate).build();
            } else {
                return Response.status(Response.Status.NOT_FOUND)
                    .entity(ErrorUtil.notFound("Cannot find rate with that id"))
                    .build();
            }
            
        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity(ErrorUtil.unAuthorized("Invalid token"))
                    .build();
        }
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void create(Rate entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Long id, Rate entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Long id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("me/posts/{postId}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response find(@HeaderParam("authorization") String token, @PathParam("postId") Long postId) {
        Long id = TokenUtil.decodeToken(token);
        if (id != null) {
            System.out.println("PathPAram: " + id);
            Query query = em.createQuery( "Select r " + "from Rate r "  + "WHERE r.userUid.uid = " + id + " AND r.postPostid.postid = " + postId);
            List<Rate> rates = (List<Rate>)query.getResultList();
            System.out.println(rates);
            if (rates.size() == 0) {
          
                Rate rate = new Rate();
                return Response.ok(rate).build(); 
//                return Response.status(Response.Status.NOT_FOUND)
//                    .entity(ErrorUtil.notFound("You have not liked this post"))
//                    .build();
            } else {
                return Response.ok(rates.get(0)).build(); 
            }
        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity(ErrorUtil.unAuthorized("Invalid token"))
                    .build();
        }
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Rate> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
