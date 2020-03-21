package edu.sjsu.cmpe275.lab2.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.sjsu.cmpe275.lab2.dto.Player;

public interface PlayerRepository extends JpaRepository<Player, Long> {

}
