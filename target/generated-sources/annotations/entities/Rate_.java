package entities;

import entities.Post;
import entities.User;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-11-28T14:10:35")
@StaticMetamodel(Rate.class)
public class Rate_ { 

    public static volatile SingularAttribute<Rate, Post> postPostid;
    public static volatile SingularAttribute<Rate, Long> rateid;
    public static volatile SingularAttribute<Rate, User> userUid;

}