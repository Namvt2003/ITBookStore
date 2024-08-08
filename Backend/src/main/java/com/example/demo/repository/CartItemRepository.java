package com.example.demo.repository;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.CartItem;

import jakarta.transaction.Transactional;

@Repository
public interface CartItemRepository  extends JpaRepository<CartItem, Long> {
	 @Query(value = "SELECT calculate_total_quantity()", nativeQuery = true )
	 Integer sumOfCartItems();
	 
	 
	 @Modifying
	 @Transactional
	 @Query("UPDATE CartItem c SET c.quantity = c.quantity + :quantity, " +"c.totalPrice = c.totalPrice + :price WHERE c.title = :title")
	 int updateQuantityAndPrice(@Param("title") String title, 
             @Param("quantity") int quantity, 
             @Param("price") Float price);

	 
	 Optional<CartItem> findByTitle(String title);
	
}
