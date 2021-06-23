package edu.sjsu.cmpe275.lab2.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import edu.sjsu.cmpe275.lab2.dto.Player;
import edu.sjsu.cmpe275.lab2.dto.Sponsor;
import edu.sjsu.cmpe275.lab2.repository.PlayerRepository;
import edu.sjsu.cmpe275.lab2.repository.SponsorRepository;

@Service
public class PlayerService {

	@Autowired
	private PlayerRepository playerRepository;

	@Autowired
	private SponsorRepository sponsorRepository;

	@Transactional
	public Player createPlayer(Player player, String sponsorName) {
		performValidations(player);
		if (playerRepository.existsByEmail(player.getEmail())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Player with same email already exists");
		}
		if (sponsorName != null) {
			Optional<Sponsor> sponsor = sponsorRepository.findById(sponsorName);
			if (sponsor.isPresent()) {
				player.setSponsor(sponsor.get());
			} else {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sponsor does not exist");
			}
		}
		return playerRepository.save(player);
	}

	@Transactional
	public Player getPlayer(long id) {
		Optional<Player> player = playerRepository.findById(id);
		if (player.isPresent()) {
			return player.get();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Player not found");
		}
	}

	@Transactional
	public String createOpponents(long id1, long id2) {
		if (id1 == id2) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Players are same");
		}
		Optional<Player> player1 = playerRepository.findById(id1);
		Optional<Player> player2 = playerRepository.findById(id2);
		if (!player1.isPresent() || !player2.isPresent()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Player not found");
		}
		if (player1.get().getOpponents().contains(player2.get())) {
			return "They are already opponents";
		}
		
		player1.get().getOpponents().add(player2.get());
		player2.get().getOpponents().add(player1.get());
		playerRepository.save(player1.get());
		playerRepository.save(player2.get());
		return "Successfully Added an opponent";
	}

	@Transactional
	public Player updatePlayer(Player player, String sponsorName) {
		performValidations(player);
		Optional<Player> existingPlayer = playerRepository.findById(player.getId());
		if (!existingPlayer.isPresent()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No player with this given ID");
		}
		Player existingPlayerObj = existingPlayer.get();
		if (playerRepository.existsByEmail(player.getEmail())) {
			if (!(player.getEmail().equals(existingPlayerObj.getEmail()))) {
				throw new ResponseStatusException(HttpStatus.CONFLICT, "Player with same e-mail already exists");
			}
		}
		existingPlayerObj.setFirstname(player.getFirstname());
		existingPlayerObj.setLastname(player.getLastname());
		existingPlayerObj.setEmail(player.getEmail());
		existingPlayerObj.setDescription(player.getDescription());
		existingPlayerObj.setAddress(player.getAddress());

		if (sponsorName != null) {
			Optional<Sponsor> sponsor = sponsorRepository.findById(sponsorName);
			if (sponsor.isPresent()) {
				existingPlayerObj.setSponsor(sponsor.get());
			} else {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sponsor does not exist");
			}
		} else {
			existingPlayerObj.setSponsor(null);
		}
		return playerRepository.save(existingPlayerObj);
	}

	@Transactional
	public Player deletePlayer(long id) {
		Optional<Player> existingPlayer = playerRepository.findById(id);
		if (!existingPlayer.isPresent()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No player with this given ID");
		}
		playerRepository.deleteById(id);
		return existingPlayer.get();
	}

	@Transactional
	public String removeOpponents(long id1, long id2) {

		Optional<Player> checkplayer1 = playerRepository.findById(id1);
		Optional<Player> checkplayer2 = playerRepository.findById(id2);
		if (!checkplayer1.isPresent() || !checkplayer2.isPresent()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Player not found");
		} else {
			Player player1 = checkplayer1.get();
			Player player2 = checkplayer2.get();

			if (!player1.getOpponents().contains(player2)) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The two players are not opponents");
			}

			player1.getOpponents().removeIf(player -> player == player2);
			player2.getOpponents().removeIf(player -> player == player1);
			playerRepository.save(player1);
			playerRepository.save(player2);

			return "The Opponents are removed successfully";

		}
	}

	private void performValidations(Player player) {
		if (player.getFirstname().isEmpty() || player.getLastname().isEmpty() || player.getEmail().isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Empty parameter found");
		}
	}
}
