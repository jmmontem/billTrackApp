package com.example.jmmontem.billTracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.jmmontem.billTracker.model.Bill;

public interface BillRepository extends JpaRepository<Bill, Integer>{

}
