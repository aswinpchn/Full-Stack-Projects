package edu.sjsu.cmpe275.lab2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.server.ResponseStatusException;

import edu.sjsu.cmpe275.lab2.dto.Address;
import edu.sjsu.cmpe275.lab2.dto.Player;
import edu.sjsu.cmpe275.lab2.dto.Sponsor;
import edu.sjsu.cmpe275.lab2.service.PlayerService;
import edu.sjsu.cmpe275.lab2.service.SponsorService;

@Controller
@RequestMapping(path = "/minigaming")
public class ApplicationController {

	@Autowired
	private PlayerService playerService;

	@Autowired
	private SponsorService sponsorService;

	@GetMapping("/sponsor/{name}")
	@ResponseBody
	public Sponsor getSponsor(@PathVariable("name") String name) {
		return sponsorService.getSponsor(name);
	}

	@GetMapping("/player/{id}")
	@ResponseBody
	public Player getPlayer(@PathVariable("id") long id) {
		return playerService.getPlayer(id);
	}

	@PostMapping("/sponsor")
	@ResponseBody
	public Sponsor createSponsor(@RequestParam(required = true) String name,
			@RequestParam(required = false) String description, @RequestParam(required = false) String street,
			@RequestParam(required = false) String city, @RequestParam(required = false) String state,
			@RequestParam(required = false) String zip) throws ResponseStatusException {

		Sponsor sponsor = new Sponsor();
		Address address = new Address();
		sponsor.setName(name);
		sponsor.setDescription(description);
		address.setStreet(street);
		address.setCity(city);
		address.setState(state);
		address.setZip(zip);
		sponsor.setAddress(address);
		return sponsorService.createSponsor(sponsor);
	}

	@PostMapping("/player")
	@ResponseBody
	public Player createPlayer(@RequestParam String firstname, @RequestParam(required = true) String lastname,
			@RequestParam(required = true) String email, @RequestParam(required = false) String description,
			@RequestParam(required = false) String sponsor, @RequestParam(required = false) String street,
			@RequestParam(required = false) String city, @RequestParam(required = false) String state,
			@RequestParam(required = false) String zip) {

		Player player = new Player();
		Address address = new Address();
		player.setFirstname(firstname);
		player.setLastname(lastname);
		player.setEmail(email);
		player.setDescription(description);
		address.setStreet(street);
		address.setCity(city);
		address.setState(state);
		address.setZip(zip);
		player.setAddress(address);
		return playerService.createPlayer(player, sponsor);
	}

	@PostMapping("/opponents/{id1}/{id2}")
	@ResponseBody
	public String createOpponents(@PathVariable long id1, @PathVariable long id2) {
		return playerService.createOpponents(id1, id2);
	}

	@PutMapping("/player/{id}")
	@ResponseBody
	public Player updatePlayer(@PathVariable(required = true) long id, @RequestParam(required = true) String firstname,
			@RequestParam(required = true) String lastname, @RequestParam(required = true) String email,
			@RequestParam(required = false) String description, @RequestParam(required = false) String sponsor,
			@RequestParam(required = false) String street, @RequestParam(required = false) String city,
			@RequestParam(required = false) String state, @RequestParam(required = false) String zip) {

		Player player = new Player();
		Address address = new Address();
		player.setId(id);
		player.setFirstname(firstname);
		player.setLastname(lastname);
		player.setEmail(email);
		player.setDescription(description);
		address.setStreet(street);
		address.setCity(city);
		address.setState(state);
		address.setZip(zip);
		player.setAddress(address);
		return playerService.updatePlayer(player, sponsor);
	}

	@DeleteMapping("/player/{id}")
	@ResponseBody
	public Player deletePlayer(@PathVariable(required = true) long id) {
		return playerService.deletePlayer(id);
	}

	@DeleteMapping("/opponents/{id1}/{id2}")
	@ResponseBody
	public String removeOpponets(@PathVariable(required = true) long id1, @PathVariable(required = true) long id2) {
		return playerService.removeOpponents(id1, id2);
	}

	@PutMapping("/sponsor/{name}")
	@ResponseBody
	public Sponsor updateSponsor(@PathVariable(required = true) String name,
			@RequestParam(required = false) String description, @RequestParam(required = false) String street,
			@RequestParam(required = false) String city, @RequestParam(required = false) String state,
			@RequestParam(required = false) String zip) throws ResponseStatusException {
		
		Sponsor sponsor = new Sponsor();
		Address address = new Address();
		sponsor.setName(name);
		sponsor.setDescription(description);
		address.setStreet(street);
		address.setCity(city);
		address.setState(state);
		address.setZip(zip);
		sponsor.setAddress(address);
		return sponsorService.updateSponsor(sponsor);
	}

	@DeleteMapping("/sponsor/{name}")
	@ResponseBody
	public Sponsor deleteSponsor(@PathVariable String name) throws ResponseStatusException {
		return sponsorService.deleteSponsor(name);
	}
}