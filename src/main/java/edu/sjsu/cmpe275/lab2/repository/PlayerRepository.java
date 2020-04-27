package edu.sjsu.cmpe275.lab2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.sjsu.cmpe275.lab2.dto.Player;
import edu.sjsu.cmpe275.lab2.dto.Sponsor;

public interface PlayerRepository extends JpaRepository<Player, Long> {
   public boolean existsByEmail(String email);
   
   public List<Player> findBySponsor(Sponsor sponsor);
}
