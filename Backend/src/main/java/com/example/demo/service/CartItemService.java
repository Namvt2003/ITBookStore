package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Book;
import com.example.demo.entity.CartItem;
import com.example.demo.repository.CartItemRepository;

import jakarta.transaction.Transactional;

@Service
public class CartItemService {
	
	@Autowired
	private CartItemRepository cartItemRepository;
	
	public List<CartItem> getCartItems() {
		return cartItemRepository.findAll();
	}



	
	
	public Integer sumOfCartItems() {
		return cartItemRepository.sumOfCartItems();
	}
	
	public void cleanCart() {
		 cartItemRepository.deleteAll();
	}
	
	@Modifying
	@Transactional
	public void addToCart(CartItem item) {
		 Optional<CartItem> existingItem = cartItemRepository.findByTitle(item.getTitle());
	        if (existingItem.isPresent()) {
	            cartItemRepository.updateQuantityAndPrice(item.getTitle(), item.getQuantity(), item.getTotalPrice());
	        } else {
	            cartItemRepository.save(item);
	        }
	}
 }