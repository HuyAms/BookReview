/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities.service;

import entities.User;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import servererror.ServerError;
import utilities.AuthUtil;
import utilities.ErrorUtil;
import utilities.JsonUtil;
import utilities.TextUtil;

/**
 *
 * @author HUYTRINH
 */
@Stateless
@Path("users")
public class UserFacadeREST extends AbstractFacade<User> {

    @PersistenceContext(unitName = "com.thmreview_BookReview_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    public UserFacadeREST() {
        super(User.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void create(User entity) {
        super.create(entity);
    }
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public Response register(@QueryParam("email") String email, @QueryParam("username") String userName, @QueryParam("password") String password) {
        System.out.println("username: " + userName);
        System.out.println("password: " + password);
        System.out.println("email: " + email);
        
        if (TextUtil.isEmpty(userName) || TextUtil.isEmpty(password) || TextUtil.isEmpty(email)) { 
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(ErrorUtil.badRequest("Field should not be empty")).build();
        }
        
        List<User> listUser = findAll();
        for(User user: listUser) {
            if (user.getUsername().equals(userName)) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity(ErrorUtil.badRequest("This username is already registered"))
                        .build();
            }
            if (user.getEmail().equals(email)){
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity(ErrorUtil.badRequest("This email is already registered"))
                        .build();
            }
        }
    
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPass(password);
        newUser.setUsername(userName);
        
        super.create(newUser);
        
        newUser = super.findNewest();
       
        String userId = newUser.getUid() + "";
        String token = AuthUtil.createToken(userId);
        String jsonToken = JsonUtil.jsonToken(token);
                
        return Response.status(Response.Status.CREATED).entity(jsonToken).build();
    }
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Path("login")
    public Response logIn(@QueryParam("username") String userName, @QueryParam("password") String password) {
        System.out.println("username: " + userName);
        System.out.println("password: " + password);
        
        if (TextUtil.isEmpty(userName) || TextUtil.isEmpty(password)) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(ErrorUtil.badRequest("Field should not be empty")).build();
        }
        
        List<User> listUser = findAll();
        for(User user: listUser) {
            if (user.getUsername().equals(userName)) {
                if (user.getPass().equals(password)) {
                    String userId = user.getUid() + "";
                    String token = AuthUtil.createToken(userId);
                    String jsonToken = JsonUtil.jsonToken(token);
                    System.out.println("username: " + userName);
                    System.out.println("pass: " + password);
                    System.out.println("jsonToken: " + jsonToken);
 
                    return Response.status(Response.Status.OK).entity(jsonToken).build();
                } else {
                    return Response.status(Response.Status.UNAUTHORIZED)
                            .entity(ErrorUtil.unAuthorized("Invalid password"))
                            .build();
                }
            } 
        }
  
        return Response.status(Response.Status.UNAUTHORIZED)
                 .entity(ErrorUtil.unAuthorized("Invalid username"))
                .build();
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Long id, User entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Long id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public User find(@PathParam("id") Long id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<User> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<User> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
