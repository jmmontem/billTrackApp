package com.example.jmmontem.billTracker.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.jmmontem.billTracker.model.User;
import com.example.jmmontem.billTracker.repository.UserRepository;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class UserController {
	
	private UserRepository userRepository;
	
	public UserController(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}
	
	
	@GetMapping("/users")
	Collection<User> getAllUsers() {
		return userRepository.findAll();
	}
	
	@GetMapping("/user/{username}")
	ResponseEntity<?> getUser(@PathVariable String username) {
		Optional<User> user = userRepository.findById(username);
		return user.map(response -> ResponseEntity.ok().body(response))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@PostMapping("/user")
	ResponseEntity<User> addUser(@Valid @RequestBody User user) throws URISyntaxException {
		
		if (user.getName().length() == 0 || user.getPassword().length()== 0 || user.getUsername().length() == 0) {
			return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
		}
		
		if (userRepository.existsById(user.getUsername())) {
			return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
		}
		
		User userAdd = userRepository.save(user); 
		
		// Insert it to the table
		return ResponseEntity.created(
				new URI("/api/user" + userAdd.getUsername())
				).body(userAdd);
	}
	
	@PutMapping("/user/{username}")
	ResponseEntity<User> updateUser(@Valid @RequestBody User user) {
		
			if (userRepository.existsById(user.getUsername())) {
				User userData = userRepository.save(user);
				return ResponseEntity.ok().body(userData);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
	}
	
	@DeleteMapping("/user/{username}")
	ResponseEntity<?> deleteUser(@PathVariable String username) {
		userRepository.deleteById(username);
		return ResponseEntity.ok().build();
	}
	
	

}
