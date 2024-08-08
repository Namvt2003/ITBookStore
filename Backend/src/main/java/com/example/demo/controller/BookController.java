package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Book;
 
import com.example.demo.repository.BookRepository;
import com.example.demo.service.BookService;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = {"http://localhost:4200","http://10.0.101.48:4200","http://192.168.237.148:4200","http://192.168.1.3:4200"})
public class BookController {
	
	@Autowired
	private BookService bookService;
	
	
	@GetMapping()
	public List<Book> getAllBooks(){
		return bookService.getAllBooks();
	}
	
	@GetMapping("/byId/{id}")
	public Book getBookById(@PathVariable Long id) {
		return bookService.getBookById(id);
	}
	
	
		
	
	@GetMapping("/byTitle/{title}")
	public Book getBookByTitle(@PathVariable String title) {
		return bookService.findBookByTitlte(title);
	}
	
//	@PutMapping("/reduce/{id}/{quantity}")
//	public void ReduceQuantity(@PathVariable Long id, @PathVariable Long quantity) {
//		bookService.ReduceQuantity(id, quantity);
//	}
//	
//	
//	@PutMapping("/increase/{id}/{quantity}")
//	public void IncreaseQuantity(@PathVariable Long id, @PathVariable Long quantity) {
//		bookService.IncreaseQuantity(id, quantity);
//	}
	
//	
//	@GetMapping("/search")
//	public List<Book> searchBooks(@RequestParam String title){
//		return bookService.searchBooks(title);
//	}
	
	
	@GetMapping("/search")
	public List<Book> searchBooks(@RequestParam String title){
		return bookService.searchBooks(title);
	}
	
	
	@PostMapping("/reduce/{id}/{quantity}")
	public void reduceQuantity(@PathVariable Long id, @PathVariable Long quantity)
	{
		bookService.reduceQuantity(id, quantity);
	}
	
	@PostMapping("/check/{id}/{soldout}")
	public void checkSoldOut(@PathVariable Long id, @PathVariable Long soldout) {
		bookService.checkSoldOut(id, soldout);
	}
	
	
	@GetMapping("/ignoreCategory")
	public List<Object> getBookIgnoreCategory() {
		return bookService.getBookIgnoreCategory();
	}
	
	
	
	
	
	
	

	 
}
