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
