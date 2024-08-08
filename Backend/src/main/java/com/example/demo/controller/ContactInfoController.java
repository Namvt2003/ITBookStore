package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.ContactInfo;
import com.example.demo.service.ContactInfoService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:4200","http://10.0.101.48:4200","http://192.168.237.148:4200","http://192.168.1.3:4200"})
public class ContactInfoController {

	
	@Autowired
	ContactInfoService contactInfoService;
	
	@PostMapping("/contacts")
	public void addContact(@RequestBody ContactInfo contactInfo) {
		contactInfoService.save(contactInfo);
	}
	
	 
	
	

}
