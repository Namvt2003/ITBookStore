package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.example.demo.entity.ContactInfo;
import com.example.demo.repository.ContactInfoRepository;

@Service
public class ContactInfoService {
		
	@Autowired
	private ContactInfoRepository contactInfoRepository;
	
	
	 
	public void save(ContactInfo contactInfo) {
		contactInfoRepository.save(contactInfo);
		
	}
	
	

	
}
