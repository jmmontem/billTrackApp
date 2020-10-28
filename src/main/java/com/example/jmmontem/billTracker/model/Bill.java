package com.example.jmmontem.billTracker.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name="bill")
public class Bill {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", updatable = false, nullable = false)
	private Integer id;
	
	@Column(name = "cost", nullable = false)
	private Integer cost;
	
	@Column(name = "name", nullable = false)
	private String name;
	
	@Column(name = "date", nullable = false)
	private Date date;
	
	@Column(name = "notified", nullable = false)
	private boolean notified;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="fk_user")
	private User user;
	
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="fk_category")
	private Category category;
	
	
	public Integer getId() {
		return this.id;
	}
	
	public Integer getCost() {
		return this.cost;
	}
	
	public void setCost(Integer cost) {
		this.cost = cost;
	}
	
	public String getName() {
		return this.name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public Date getDate() {
		return this.date;
	}
	
	public void setDate(Date date) {
		this.date = date;
	}
	
	public boolean getNotified() {
		return this.notified;
	}
	
	public void setNotified(boolean notified) {
		this.notified = notified;
	}
	
	public User getUser() {
		return this.user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
	
	public Category getCategory() {
		return this.category;
	}
	
	public void setCategory(Category category) {
		this.category = category;
	}

}
