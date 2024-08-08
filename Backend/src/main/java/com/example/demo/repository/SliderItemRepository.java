package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.SliderItem;

@Repository
public interface SliderItemRepository extends JpaRepository<SliderItem, Long>{
	
}
