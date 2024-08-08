package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "cart_item")
public class CartItem {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	
	
	
	@Column(name = "title", nullable = false, unique = true)
	private String title;
	
	
	@Column(name = "image_url", nullable = false)
	private String image_url;
	
	@Column(name = "quantity", nullable = false)
	private Integer quantity;
	
	
	@Column(name = "total_price", nullable = false)
	private Float totalPrice;
	
	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getImage_url() {
		return image_url;
	}


	public void setImage_url(String image_url) {
		this.image_url = image_url;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	
	
	public Integer getQuantity() {
		return quantity;
	}


	public void setQuantity(Integer quanity) {
		this.quantity = quanity;
	}


	


	public Float getTotalPrice() {
		return totalPrice;
	}


	public void setTotalPrice(Float totalPrice) {
		this.totalPrice = totalPrice;
	}
	
	
		
}
