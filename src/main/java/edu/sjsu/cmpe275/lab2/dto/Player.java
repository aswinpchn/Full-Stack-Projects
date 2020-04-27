package edu.sjsu.cmpe275.lab2.dto;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

	@Embedded
	private Address address;

	@ManyToOne(fetch = FetchType.EAGER, optional = true)
	@JsonIgnoreProperties({"beneficiaries"})
	@JoinColumn(name = "sponsor_id", nullable = true)
	private Sponsor sponsor;

	@JsonIgnoreProperties({"opponents", "sponsor"})
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "opponents",
					joinColumns = @JoinColumn(name = "player1", nullable = false),
					inverseJoinColumns = @JoinColumn(name = "player2", nullable = false)
	)
	private List<Player> opponents = new ArrayList<>();

	public List<Player> getOpponents() {
		return opponents;
	}

	public void setOpponents(List<Player> opponents) {
		this.opponents = opponents;
	}

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

	public Address getAddress() {
		return this.address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}
}
