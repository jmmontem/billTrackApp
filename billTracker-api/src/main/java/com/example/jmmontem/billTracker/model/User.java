package com.example.jmmontem.billTracker.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="user")
public class User {
	
	public static void main(String[] args) {
//		String pasTest = "Hello";
//		User user1 = new User();
//		user1.setPassword(pasTest);
//		System.out.println(user1.getPassword());
	}
	

	@Id
	@Column(name = "username", updatable = false, nullable = false)
	private String username;
	
	@Column(name = "password", nullable=false)
	private String password;
	
	@Column(name = "name", nullable=false)
	private String name;
	
	@Column(name = "email", nullable=false)
	private String email;
	
	@Column(name = "phone", nullable=false)
	private String phone;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Bill> bills;
	
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return this.password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getName() {
		return this.name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getEmail() {
		return this.email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getPhone() {
		return this.phone;
	}
	
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public List<Bill> getBills() {
		return this.bills;
	}
	
	public void setBills(List<Bill> bills) {
		this.bills = bills;
	}
}
