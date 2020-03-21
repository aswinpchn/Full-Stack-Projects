package edu.sjsu.cmpe275.lab2.dto;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "player")
public class Player {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
    private String firstname;
    
    private String lastname;
    
    private String email;
    
    private String description;
    
    /** TODO */
    //private Address address;
    
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "sponsor_id", nullable = true)
    private Sponsor sponsor;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Sponsor getSponsor() {
		return sponsor;
	}

	public void setSponsor(Sponsor sponsor) {
		this.sponsor = sponsor;
	}
    
    /** TODO */
   // private List<Player> opponents;
}
