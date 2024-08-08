package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Order;
import com.example.demo.repository.OrderRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderService {
		
	@Autowired
	private OrderRepository orderRepository;
	
	
	public void save(Order order) {
		orderRepository.save(order);
	}
	
	
	public List<Order> getAll() {
		return orderRepository.findAll();
	}
	
	public void deleteById(Long id) {
		orderRepository.deleteById(id);
	}
	
	
	
	public List<String> getBookNamesById(Long id){
		List<String> bookNames = orderRepository.getBookNamesById(id);
        System.out.println("Book names for order " + id + ": " + bookNames);
        return bookNames;
	}
	
	@Transactional
	public void deleteBookNames(Long id) {
		orderRepository.deleteBookNamesById(id);
	}
	
	public void deleteOrders(Long id) {
		orderRepository.deleteById(id);
	}
}
