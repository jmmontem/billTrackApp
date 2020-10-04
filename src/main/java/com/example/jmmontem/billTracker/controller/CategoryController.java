package com.example.jmmontem.billTracker.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.jmmontem.billTracker.model.Category;
import com.example.jmmontem.billTracker.repository.CategoryRepository;


@RestController
@RequestMapping("/api")
public class CategoryController {
	
	private CategoryRepository categoryRepository;
	
	public CategoryController(CategoryRepository categoryRepository) {
		super();
		this.categoryRepository = categoryRepository;
		
	}

	@GetMapping("/categories")
	Collection<Category> getAllCategories() {
		return categoryRepository.findAll();
	}
	
	@GetMapping("/category/{id}")
	ResponseEntity<?> getCategory(@PathVariable Integer id) {
		Optional<Category> categoryData = categoryRepository.findById(id);
		
		return categoryData.map(response -> ResponseEntity.ok().body(response))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@PostMapping("/category")
	ResponseEntity<Category> addCategory(@Valid @RequestBody Category category) throws URISyntaxException {
		
		if (category.getName().length() == 0) {
			return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
		}
		
		if (categoryRepository.existsCategoryByName(category.getName())) {
			return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
		}
		else {
			Category addCategory = categoryRepository.save(category);
			return ResponseEntity.created(
					new URI("/api/category" + addCategory.getId())
					).body(addCategory);
		}
	}
	
	
	@PutMapping("/category/{id}")
	ResponseEntity<Category> updateCategory(@Valid @RequestBody Category category) {
		
		if (categoryRepository.existsById(category.getId())) {
			Category addCategory = categoryRepository.save(category);
			return ResponseEntity.ok().body(addCategory);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/category/{id}")
	ResponseEntity<?> deleteCategory (@PathVariable Integer id) {
		categoryRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}
	
}
