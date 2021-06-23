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

	// This means that an object with complex data will be embedded here in DB.
	@Embedded
	private Address address;

	/*
		A Player can have one sponsor optionally.

		When displaying player object, we are going to display sponsor object under it. If we display beneficaries for that sponsor, it will display player again and then a cycle is formed.
		So we have to ignore beneficiaries of sponsors. That's what we do with the JsonIgnoreProperties({"beneficiaries"}) for cycle not to occur.

		@JoinColumn(name = "sponsor_id", nullable = true)
		name: The name of the foreign key column.
     * The table in which it is found depends upon the
     * context. As here it is ManyToOne, * the foreign key column is in the table of the
     * source entity or embeddable.  ("sponsor_id" column is in the player itself)

		Generally, ...ToOne, ones ending with ToOne, should have Eager and TOMany should avoid having Eager.
	 */
	@ManyToOne(fetch = FetchType.EAGER, optional = true)
	@JsonIgnoreProperties({"beneficiaries"})
	@JoinColumn(name = "sponsor_id", nullable = true)
	private Sponsor sponsor;

	/*
		This is a ManyToMany relationship, so we should have joinTable. by name property, we can tell what is the actual Table name in DB.

		JoinColumn name refers to The foreign key columns
     * of the join table which reference the
     * primary table of the entity owning the
     * association.

		InverseJoinColumn name refers to The foreign key columns
     * of the join table which reference the
     * primary table of the entity that does
     * not own the association.


    IgnoreJSON is as ususal, we have to ignore {"opponents", "sponsor"}, else there will be cycle.
	 */
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
