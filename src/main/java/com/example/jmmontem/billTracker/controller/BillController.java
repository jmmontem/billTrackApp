package com.example.jmmontem.billTracker.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.example.jmmontem.billTracker.model.Bill;
import com.example.jmmontem.billTracker.repository.BillRepository;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class BillController {
	
	@Autowired
	private BillRepository billRepository;
	
	@GetMapping("/bills")
	Collection<Bill> getAllBills() {
		return billRepository.findAll();
	}
	
	@GetMapping("/bills/{user}")
	Collection<Bill> getAllUserBills(@PathVariable String user) {
		return billRepository.findByUser_UsernameOrderById(user);
	}
	
	@GetMapping("/bill/{id}")
	ResponseEntity<?> getUser(@PathVariable Integer id) {
		Optional<Bill> bill = billRepository.findById(id);
		return bill.map(response -> ResponseEntity.ok().body(response))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@PostMapping("/bill")
	ResponseEntity<Bill> addBill(@Valid @RequestBody Bill bill) throws URISyntaxException {
		
		if (bill.getName().length() == 0 || bill.getCost() <= 0) {
			return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
		}
		
		Bill billAdd = billRepository.save(bill);
		return ResponseEntity.created(
				new URI("/api/bill" + billAdd.getId())
				).body(billAdd);
		
	}
	
	@PutMapping("/bill/{id}")
	ResponseEntity<Bill> updateBill(@Valid @RequestBody Bill bill) {
		
		
		if (billRepository.existsById(bill.getId())) {
			Bill updatedBill = billRepository.save(bill);
			return ResponseEntity.ok().body(updatedBill);
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	@DeleteMapping("/bill/{id}")
	ResponseEntity<?> deleteBill(@PathVariable Integer id) {
		billRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}
	
	

}
