package com.example.demo.service;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.entity.UserRole;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.UserRoleRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserRoleRepository userRoleRepository;
	
	
	public User createUser(User user) {
		User fetchedUser = userRepository.findUserRoleByUsername(user.getUsername()).orElseThrow(() -> new RuntimeException("role not found!"));
//		UserRole userRole = userRepository.findByUsername(user.getUsername()).orElseThrow(() -> new RuntimeException("Role not found!"));
		UserRole role = fetchedUser.getRole();
		if(role == null) {
			throw new RuntimeException("user not found!");
		}
		user.setRole(role);
		return user;
	}

 
	
	
	 
}
