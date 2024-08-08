package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.CartItem;
import com.example.demo.service.CartItemService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:4200","http://10.0.101.48:4200","http://192.168.237.148:4200","http://192.168.1.3:4200"})
public class CartItemController {
	int count = 0;
	@Autowired
	private CartItemService cartItemService;

	@GetMapping
	public List<CartItem> getCartItems() {
		return cartItemService.getCartItems();
	}

	@PostMapping("/cartitems")
	public ResponseEntity<Void> addToCarts(@RequestBody CartItem cartItem) {
		cartItemService.addToCart(cartItem);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	@DeleteMapping("/delete")
	public void clearnCart() {
		this.cartItemService.cleanCart();
	}
	
	
	
	
//	@PostMapping("/cartitems")
//	public ResponseEntity<String> addToCarts(@RequestBody CartItem cartItem) {
//	    try {
//	        cartItemService.addToCart(cartItem);
//	        String successMessage = "Item successfully added to cart";
//	        System.out.println(successMessage);   
//	        return ResponseEntity.status(HttpStatus.CREATED).body(successMessage);
//	    } catch (Exception e) {
//	        String errorMessage = "Failed to add item to cart: " + e.getMessage();
//	        System.err.println(errorMessage);  
//	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
//	    }
//	}
	
	 

	@GetMapping("/sum")
	public ResponseEntity<Integer> sumOfCartItmes() {
		System.out.println(count++);
		return ResponseEntity.ok(cartItemService.sumOfCartItems());
	}
	
	
	
	

}
