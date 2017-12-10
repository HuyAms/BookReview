/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author HUYTRINH
 */
@Entity
@Table(name = "rate")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Rate.findAll", query = "SELECT r FROM Rate r")
    ,@NamedQuery(name = "Rate.findByRateid", query = "SELECT r FROM Rate r WHERE r.rateid = :rateid")})
//    , @NamedQuery(name = "Rate.findByRating", query = "SELECT r FROM Rate r WHERE r.rating = :rating")})
public class Rate implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "RATEID")
    private Long rateid;
//    @Column(name = "RATING")
//    private Integer rating;
    @JoinColumn(name = "POST_POSTID", referencedColumnName = "POSTID")
    @ManyToOne
    private Post postPostid;
    @JoinColumn(name = "USER_UID", referencedColumnName = "UID")
    @ManyToOne
    private User userUid;

    public Rate() {
    }

    public Rate(Long rateid) {
        this.rateid = rateid;
    }

    public Long getRateid() {
        return rateid;
    }

    public void setRateid(Long rateid) {
        this.rateid = rateid;
    }

//    public Integer getRating() {
//        return rating;
//    }
//
//    public void setRating(Integer rating) {
//        this.rating = rating;
//    }

    public Post getPostPostid() {
        return postPostid;
    }

    public void setPostPostid(Post postPostid) {
        this.postPostid = postPostid;
    }

    @JsonIgnore
    public User getUserUid() {
        return userUid;
    }

    public void setUserUid(User userUid) {
        this.userUid = userUid;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (rateid != null ? rateid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Rate)) {
            return false;
        }
        Rate other = (Rate) object;
        if ((this.rateid == null && other.rateid != null) || (this.rateid != null && !this.rateid.equals(other.rateid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entities.Rate[ rateid=" + rateid + " ]";
    }
    
}
