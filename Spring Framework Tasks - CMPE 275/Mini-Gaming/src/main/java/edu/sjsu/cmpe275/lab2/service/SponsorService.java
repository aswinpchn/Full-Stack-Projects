package edu.sjsu.cmpe275.lab2.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import edu.sjsu.cmpe275.lab2.dto.Player;
import edu.sjsu.cmpe275.lab2.dto.Sponsor;
import edu.sjsu.cmpe275.lab2.repository.SponsorRepository;

@Service
public class SponsorService {

	@Autowired
	private SponsorRepository sponsorRepository;

	@Transactional
	public Sponsor createSponsor(Sponsor sponsor) {
		performValidations(sponsor);
		if (sponsorRepository.existsById(sponsor.getName())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Sponsor already exists");
		}
		return sponsorRepository.save(sponsor);
	}

	@Transactional
	public Sponsor getSponsor(String name) {
		Optional<Sponsor> sponsor = sponsorRepository.findById(name);
		if (sponsor.isPresent()) {
			return sponsor.get();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}
	}

	@Transactional
	public Sponsor updateSponsor(Sponsor sponsor) {
		Optional<Sponsor> existingSponsor = sponsorRepository.findById(sponsor.getName());
		if (!existingSponsor.isPresent()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sponsor doesn't exist");
		}
		Sponsor existingSponsorObj = existingSponsor.get();
		existingSponsorObj.setDescription(sponsor.getDescription());
		existingSponsorObj.setAddress(sponsor.getAddress());
		existingSponsorObj.setName(sponsor.getName());
		return sponsorRepository.save(existingSponsorObj);
	}

	@Transactional
	public Sponsor deleteSponsor(String name) {
		Optional<Sponsor> existingSponsor = sponsorRepository.findById(name);
		if (!existingSponsor.isPresent()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sponsor doesn't exist");
		}
		List<Player> beneficiaries = existingSponsor.get().getBeneficiaries();
		if (beneficiaries != null && beneficiaries.size() > 0) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
					"Sponsor has atleast one beneficiary, so it cannot be deleted");
		}
		sponsorRepository.deleteById(name);
		return existingSponsor.get();
	}
	

	private void performValidations(Sponsor sponsor) {
		if (sponsor.getName().length() < 2) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sponsor name should be min 2 characters");
		}
	}

}
