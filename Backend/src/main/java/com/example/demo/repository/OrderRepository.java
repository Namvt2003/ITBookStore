package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Order;


@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
	
	@Query("SELECT ob.bookname FROM OrderBookNames ob WHERE ob.order_id.id = :id")
	List<String> getBookNamesById(@Param("id")Long id);
	
	
	@Modifying
	@Query("DELETE FROM OrderBookNames b WHERE b.order_id.id = :id")
	void deleteBookNamesById(@Param("id") Long id);
	
	 
}
