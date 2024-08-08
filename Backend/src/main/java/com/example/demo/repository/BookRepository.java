package com.example.demo.repository;

import org.springframework.stereotype.Repository;

import com.example.demo.entity.Book;
 

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface BookRepository extends JpaRepository<Book, Long>{
    
	 @Query("SELECT b FROM Book b WHERE lower(b.title) LIKE lower(concat('%', :query, '%')) OR lower(b.author) LIKE lower(concat('%', :query, '%'))")
	List<Book> findBookByTitle(String query);

	Book findByTitle(String title);
	
	@Query("SELECT id, title, author, price, image_url, rating, description, quantity, soldout, category.id FROM Book ")
	List<Object> findBookWithCategoryId();
	
	
	List<Book> findByTitleContainingIgnoreCase(@Param("title") String title);
	
	
	@Modifying
	@Transactional
	@Query("UPDATE Book b SET b.quantity = b.quantity - :quantity WHERE b.id = :id")
	void reduceBookQuantity(@Param("id") Long id, @Param("quantity") Long quantity);
	
	@Modifying
	@Transactional
	@Query("UPDATE Book b SET b.quantity = b.quantity + :quantity WHERE b.id = :id")
	void increaseBookQuantity(@Param("id") Long id, @Param("quantity") Long quantity);
	 
	@Modifying
	@Transactional
	@Query("UPDATE Book b SET b.soldout = :soldout WHERE b.id = :id")
	void checkSoldOut(@Param("id") Long id, @Param("soldout") Long soldout);
	  
}
