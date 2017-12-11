package entities;

import entities.Comment;
import entities.Post;
import entities.Rate;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-12-11T16:24:33")
@StaticMetamodel(User.class)
public class User_ { 

    public static volatile SingularAttribute<User, Long> uid;
    public static volatile CollectionAttribute<User, Post> postCollection;
    public static volatile CollectionAttribute<User, Rate> rateCollection;
    public static volatile SingularAttribute<User, String> pass;
    public static volatile CollectionAttribute<User, Comment> commentCollection;
    public static volatile SingularAttribute<User, String> email;
    public static volatile SingularAttribute<User, String> username;

}