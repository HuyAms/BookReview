package entities;

import entities.Category;
import entities.Comment;
import entities.Rate;
import entities.User;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-11-25T01:00:17")
@StaticMetamodel(Post.class)
public class Post_ { 

    public static volatile SingularAttribute<Post, String> path;
    public static volatile CollectionAttribute<Post, Category> categoryCollection;
    public static volatile CollectionAttribute<Post, Rate> rateCollection;
    public static volatile SingularAttribute<Post, String> review;
    public static volatile CollectionAttribute<Post, Comment> commentCollection;
    public static volatile SingularAttribute<Post, Long> postid;
    public static volatile SingularAttribute<Post, String> bookAuthor;
    public static volatile SingularAttribute<Post, String> bookTitle;
    public static volatile SingularAttribute<Post, Date> timestamp;
    public static volatile SingularAttribute<Post, User> userUid;

}