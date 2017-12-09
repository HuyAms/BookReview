package entities;

import entities.Post;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-12-09T15:53:54")
@StaticMetamodel(Category.class)
public class Category_ { 

    public static volatile CollectionAttribute<Category, Post> postCollection;
    public static volatile SingularAttribute<Category, String> category;
    public static volatile SingularAttribute<Category, Long> categoryid;

}