package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:4200","http://10.0.101.48:4200","http://192.168.237.148:4200","http://192.168.1.3:4200"})
public class UserController {

	@Autowired
	private UserService userService;

	 
	@PostMapping("/login")
	public ResponseEntity<?> userLogin(@RequestBody User user_info) {
		User user = userService.createUser(user_info);
		if (user !=null && user.getPassword().equals(user_info.getPassword())) {
			return ResponseEntity.ok(user);
		}
		return  (ResponseEntity<?>) ResponseEntity.internalServerError();

		
	}
	
	
	
	
	
	 
}
