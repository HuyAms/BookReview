package entities;

import entities.Post;
import entities.User;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-12-10T18:23:33")
@StaticMetamodel(Comment.class)
public class Comment_ { 

    public static volatile SingularAttribute<Comment, Post> postPostid;
    public static volatile SingularAttribute<Comment, Long> commentid;
    public static volatile SingularAttribute<Comment, String> content;
    public static volatile SingularAttribute<Comment, Date> timestamp;
    public static volatile SingularAttribute<Comment, User> userUid;

}