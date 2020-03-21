package edu.sjsu.cmpe275.lab2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.sjsu.cmpe275.lab2.dto.Player;
import edu.sjsu.cmpe275.lab2.dto.Sponsor;
import edu.sjsu.cmpe275.lab2.repository.PlayerRepository;
import edu.sjsu.cmpe275.lab2.repository.SponsorRepository;

@Controller
@RequestMapping(path = "/minigaming")
public class ApplicationController {

	@Autowired
	private SponsorRepository sponsorRepository;

	@Autowired
	private PlayerRepository playerRepository;

	@PostMapping("/sponsor")
	@ResponseBody
	public Sponsor createSponsor(@RequestParam String name, @RequestParam String description) {
		Sponsor sponsor = new Sponsor();
		sponsor.setName(name);
		sponsor.setDescription(description);
		return sponsorRepository.save(sponsor);
	}

	@PostMapping("/player")
	@ResponseBody
	public Player createPlayer(@RequestParam String firstname, @RequestParam String lastname,
			@RequestParam String email, @RequestParam String sponsor) {
		Player player = new Player();
		player.setFirstname(firstname);
		player.setLastname(lastname);
		player.setEmail(email);
		player.setSponsor(sponsorRepository.findById(sponsor).get());
		return playerRepository.save(player);
	}
}