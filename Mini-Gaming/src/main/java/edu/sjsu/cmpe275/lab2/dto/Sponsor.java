package edu.sjsu.cmpe275.lab2.dto;

import java.util.List;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "sponsor")
public class Sponsor {

	@Id
	private String name;

	private String description;

	@Embedded
	private Address address;

	/*
		Note: When ever we are creating relationships, its upon us to decide if it is going to be uni-directional or bi-directional relationship.
		https://thoughts-on-java.org/ultimate-guide-association-mappings-jpa-hibernate/#manyToMany


		https://www.baeldung.com/jpa-joincolumn-vs-mappedby
		We know that the Player side is the owning side of this relationship.
		The value of mappedBy is name of the attribute in the owning side, In our case it is <private Sponsor sponsor;>, "sponsor"


		Then we have typical JSONIgnore to avoid cycles.
	 */
	@JsonIgnoreProperties({"sponsor", "opponents"})
	@OneToMany(fetch = FetchType.EAGER,mappedBy = "sponsor")
	private List<Player> beneficiaries;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public List<Player> getBeneficiaries() {
		return beneficiaries;
	}

	public void setBeneficiaries(List<Player> beneficiaries) {
		this.beneficiaries = beneficiaries;
	}
}
