package com.example.demo.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Book;
import com.example.demo.entity.SliderItem;
import com.example.demo.service.SliderItemService;

@RestController
@RequestMapping("/api/sliders")
@CrossOrigin(origins = {"http://localhost:4200","http://10.0.101.48:4200","http://192.168.237.148:4200","http://192.168.1.3:4200"})
public class SliderItemController {
	
	 
	@Autowired
	private SliderItemService sliderItemService;
	
	@GetMapping
	public List<SliderItem> getAllSliderItems() {
		return sliderItemService.getAllSliderItems();
	}
	
	
	 
	@GetMapping("/{id}")
	public SliderItem getSliderById(@PathVariable Long id) {
		return sliderItemService.getSliderItemById(id);
	}
}
