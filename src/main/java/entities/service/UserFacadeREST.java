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
import org.mindrot.jbcrypt.BCrypt;
import servererror.ServerError;
import utilities.TokenUtil;
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

//    @POST
//    @Override
//    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
//    public void create(User entity) {
//        super.create(entity);
//    }
   
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Path("register")
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
       
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt(12));
        newUser.setPass(hashedPassword);
       
        newUser.setUsername(userName);
       
        super.create(newUser);
       
        newUser = super.findNewest();
       
        String userId = newUser.getUid() + "";
        String token = TokenUtil.createToken(userId);
        String jsonToken = JsonUtil.jsonToken("token", token);
               
        return Response.status(Response.Status.CREATED).entity(jsonToken).build();
    }
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Path("login")
    public Response logIn(@QueryParam("username") String userName, @QueryParam("password") String password) {
    
        if (TextUtil.isEmpty(userName) || TextUtil.isEmpty(password)) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(ErrorUtil.badRequest("Field should not be empty")).build();
        }
       
        List<User> listUser = findAll();
        for(User user: listUser) {
            if (user.getUsername().equals(userName)) {
                if (BCrypt.checkpw(password, user.getPass())) {
                    String userId = user.getUid() + "";
                    String token = TokenUtil.createToken(userId);
                    String jsonToken = JsonUtil.jsonToken("token", token);
                  
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
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Long id, User entity) {
        super.edit(entity);
    }
    
    @PUT
    @Path("me")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response editMe(@HeaderParam("authorization") String token,
                       @QueryParam("email") String email, 
                       @QueryParam("username") String userName, 
                       @QueryParam("oldpassword") String oldPassword, 
                       @QueryParam("newpassword") String newPassword) {
        
        Long id = TokenUtil.decodeToken(token);
        if (id != null) {
            if (TextUtil.isEmpty(userName)) {
                    return Response.status(Response.Status.BAD_REQUEST)
                     .entity(ErrorUtil.badRequest("Username should not be empty"))
                    .build(); 
                }
                
            if (TextUtil.isEmpty(email)) {
                return Response.status(Response.Status.BAD_REQUEST)
                .entity(ErrorUtil.badRequest("Email should not be empty"))
                .build(); 
            }
            
            
            System.out.println("password: " + oldPassword);
            if(!TextUtil.isEmpty(oldPassword)) {
                if (TextUtil.isEmpty(newPassword)) {
                    return Response.status(Response.Status.BAD_REQUEST)
                    .entity(ErrorUtil.badRequest("New password should not be empty"))
                    .build(); 
                }
  
                //update password
                User me = super.find(id);
                System.out.println("Update password");
                if(!TextUtil.isEmpty(oldPassword)) {
                    if (BCrypt.checkpw(oldPassword, me.getPass())) {
                        System.out.println("oldPassword currect: " + oldPassword);
                        String hashedPassword = BCrypt.hashpw(newPassword, BCrypt.gensalt(12));
                        me.setPass(hashedPassword);
                        super.edit(me);
                        return Response.ok(me).build();
                    } else {
                        System.out.println("oldPassword not currect: " + oldPassword);
                         return Response.status(Response.Status.BAD_REQUEST)
                        .entity(ErrorUtil.badRequest("Old password is not correct")).build();
                    }  
                } else {
                    return Response.status(Response.Status.BAD_REQUEST)
                    .entity(ErrorUtil.badRequest("old password should not be empty")).build();
                }   
            } else {
                //not update password
                User me = super.find(id);
                
                
                //check valid email and pass
                List<User> listUser = findAll();
                for(User user: listUser) {
                    if (user.getUsername().equals(userName) && !me.getUsername().equals(userName)) {
                        return Response.status(Response.Status.BAD_REQUEST)
                                .entity(ErrorUtil.badRequest("This username is already registered"))
                                .build();
                    }
                    if (user.getEmail().equals(email) && !me.getEmail().equals(email)){
                        return Response.status(Response.Status.BAD_REQUEST)
                                .entity(ErrorUtil.badRequest("This email is already registered"))
                                .build();
                    }
                }
                
                if (TextUtil.isEmpty(userName) || TextUtil.isEmpty(email)) {
                    return Response.status(Response.Status.BAD_REQUEST)
                                .entity(ErrorUtil.badRequest("Fields should not be empty"))
                                .build();
                }
               
                me.setEmail(email);
                me.setUsername(userName);
                super.edit(me);
                return Response.ok(me).build();
            }
        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                     .entity(ErrorUtil.unAuthorized("Invalid token"))
                    .build();
        }
    }

    @DELETE
    @Path("me")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response remove(@HeaderParam("authorization") String token) {
        System.out.println("token: " + token);
        Long id = TokenUtil.decodeToken(token);
        System.out.println("id: " + id);
        if (id != null) {
            User user = super.find(id);
       
            if (user!=null) {
                super.remove(user);
                return Response.status(Response.Status.OK)
                     .entity(user)
                    .build();
            } else {
                return Response.status(Response.Status.NOT_FOUND)
                     .entity(ErrorUtil.notFound("Cannot find user with that id"))
                    .build();
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
        Long userId = TokenUtil.decodeToken(token);
        if (userId != null) {
            User user = super.find(id);
            if (user!= null) {
//                user.setPass("");
                return Response.status(Response.Status.OK)
                    .entity(user)
                    .build();
            } else {
                return Response.status(Response.Status.UNAUTHORIZED)
                     .entity(ErrorUtil.notFound("Cannot find user with that id"))
                    .build();
            }
                               
        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                     .entity(ErrorUtil.unAuthorized("Invalid token"))
                    .build();
        }
    }
    
    @GET
    @Path("test")
    public String test() {
        return "My name is Huy";
    }
    
    @GET
    @Path("me")
    @Produces({MediaType.APPLICATION_JSON})
    public Response findMe(@HeaderParam("authorization") String token) {
        Long userId = TokenUtil.decodeToken(token);
        if (userId != null) {
            User user = super.find(userId);
            if (user!= null) {
//                user.setPass("");
                return Response.status(Response.Status.OK)
                    .entity(user)
                    .build();
            } else {
                return Response.status(Response.Status.UNAUTHORIZED)
                     .entity(ErrorUtil.notFound("Cannot find user with that id"))
                    .build();
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
        Long userId = TokenUtil.decodeToken(token);
        if (userId != null) {
            List<User> listUser = super.findAll();
            GenericEntity<List<User>> entities = new GenericEntity<List<User>>(listUser) {};
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
