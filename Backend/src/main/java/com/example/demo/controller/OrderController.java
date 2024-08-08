package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Order;
import com.example.demo.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = {"http://localhost:4200","http://10.0.101.48:4200","http://192.168.237.148:4200","http://192.168.1.3:4200"})
public class OrderController {

	
	@Autowired
	private OrderService orderService;
	
	@PostMapping()
	public void save(@RequestBody Order order){
		orderService.save(order);
	}

	@GetMapping()
	public List<Order> getOrders(){
		return orderService.getAll();
	}
	
	@DeleteMapping("/{id}")
	public void deleteById(@PathVariable Long id) {
		orderService.deleteById(id);
	}
	
	
	@GetMapping("/{id}")
	public List<String> getBookNamesById(@PathVariable Long id) {
		return orderService.getBookNamesById(id);
	}
	
	
	@DeleteMapping("/booknames/{id}")
	public void deleteBookNames(@PathVariable Long id) {
		orderService.deleteBookNames(id);
	}
	
	
	
	
	
	
	  
	
	
	
}
