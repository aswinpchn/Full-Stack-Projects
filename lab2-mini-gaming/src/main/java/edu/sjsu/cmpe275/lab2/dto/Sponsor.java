package edu.sjsu.cmpe275.lab2.dto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sponsor")
public class Sponsor {
	
	@Id
	private String name;  // primary key, >= two characters after trimming white spaces
    
	private String description;
    
    /** TODO */
    //private Address address;
    
	/** This is commented because not sure if we need this list here  */
    //private List<Player> beneficiaries;

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
	
    /**
	public List<Player> getBeneficiaries() {
		return beneficiaries;
	}

	public void setBeneficiaries(List<Player> beneficiaries) {
		this.beneficiaries = beneficiaries;
	}**/
}
