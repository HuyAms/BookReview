/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author HUYTRINH
 */
@Entity
@Table(name = "post")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Post.findAll", query = "SELECT p FROM Post p")
    , @NamedQuery(name = "Post.findByPostid", query = "SELECT p FROM Post p WHERE p.postid = :postid")
    , @NamedQuery(name = "Post.findByBookTitle", query = "SELECT p FROM Post p WHERE p.bookTitle = :bookTitle")
    , @NamedQuery(name = "Post.findByBookAuthor", query = "SELECT p FROM Post p WHERE p.bookAuthor = :bookAuthor")
    , @NamedQuery(name = "Post.findByPath", query = "SELECT p FROM Post p WHERE p.path = :path")
    , @NamedQuery(name = "Post.findByReview", query = "SELECT p FROM Post p WHERE p.review = :review")
    , @NamedQuery(name = "Post.findByTimestamp", query = "SELECT p FROM Post p WHERE p.timestamp = :timestamp")})
public class Post implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "POSTID")
    private Long postid;
    @Size(max = 255)
    @Column(name = "BOOK_TITLE")
    private String bookTitle;
    @Size(max = 255)
    @Column(name = "BOOK_AUTHOR")
    private String bookAuthor;
    @Size(max = 255)
    @Column(name = "PATH")
    private String path;
    @Size(max = 255)
    @Column(name = "REVIEW")
    private String review;
    @Column(name = "TIMESTAMP")
    private Date timestamp;
    @Column(name = "VIEW")
    private Long view;
    @ManyToMany(mappedBy = "postCollection")
    private List<Category> categoryCollection = new ArrayList();
    @JoinColumn(name = "USER_UID", referencedColumnName = "UID")
    @ManyToOne
    private User userUid;
    @OneToMany(mappedBy = "postPostid", cascade = {CascadeType.REMOVE })
    private Collection<Rate> rateCollection;
    @OneToMany(mappedBy = "postPostid", cascade = {CascadeType.REMOVE })
    private Collection<Comment> commentCollection;

    public Post() {
    }

    public Post(Long postid) {
        this.postid = postid;
    }
    
    public void addCategory(Category category) {
        categoryCollection.add(category);
        category.getPostCollection().add(this);
    }

    public Long getPostid() {
        return postid;
    }

    public void setPostid(Long postid) {
        this.postid = postid;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public String getBookAuthor() {
        return bookAuthor;
    }

    public void setBookAuthor(String bookAuthor) {
        this.bookAuthor = bookAuthor;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Long getView() {
        return view;
    }

    public void setView(Long view) {
        this.view = view;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

//    @XmlTransient
    public List<Category> getCategoryCollection() {
        return categoryCollection;
    }

    public void setCategoryCollection(List<Category> categoryCollection) {
        this.categoryCollection = categoryCollection;
    }

    public User getUserUid() {
        return userUid;
    }

    public void setUserUid(User userUid) {
        this.userUid = userUid;
    }

    @XmlTransient
    public Collection<Rate> getRateCollection() {
        return rateCollection;
    }

    public void setRateCollection(Collection<Rate> rateCollection) {
        this.rateCollection = rateCollection;
    }

    @XmlTransient
    public Collection<Comment> getCommentCollection() {
        return commentCollection;
    }

    public void setCommentCollection(Collection<Comment> commentCollection) {
        this.commentCollection = commentCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (postid != null ? postid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Post)) {
            return false;
        }
        Post other = (Post) object;
        if ((this.postid == null && other.postid != null) || (this.postid != null && !this.postid.equals(other.postid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entities.Post[ postid=" + postid + " ]";
    }
    
}
