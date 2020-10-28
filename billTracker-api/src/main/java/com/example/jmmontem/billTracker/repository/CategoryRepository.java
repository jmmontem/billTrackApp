package com.example.jmmontem.billTracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.jmmontem.billTracker.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer>{
	
	boolean existsCategoryByName(String name);

}
