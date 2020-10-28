package com.example.jmmontem.billTracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.jmmontem.billTracker.model.Bill;

public interface BillRepository extends JpaRepository<Bill, Integer>{

	List<Bill> findByUser_UsernameOrderById(String username);
	
}
