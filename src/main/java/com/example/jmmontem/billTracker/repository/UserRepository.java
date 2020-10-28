package com.example.jmmontem.billTracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.jmmontem.billTracker.model.User;

public interface UserRepository extends JpaRepository<User,	String>{
	
}
