package com.example.demo.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Book;
import com.example.demo.entity.Category;
//import com.example.demo.entity.Category;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.CategoryRepository;

@Service
public class BookService {
	
	@Autowired
	private BookRepository bookRepository;
	
	
	@Autowired 
	private CategoryRepository categoryRepository;
	
	public List<Book> getAllBooks(){
		return bookRepository.findAll();
	}
	
	
	public Book getBookById(Long id) {
		return bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found!"));
	}
	
//	public List<Book> searchBooks(String query) {
//		return bookRepository.findBookByTitle(query);
//	}
	
	public List<Book> searchBooks(String title) {
		return bookRepository.findByTitleContainingIgnoreCase(title);
	}
	
	public void reduceQuantity(Long id,Long quantity) {
		 bookRepository.reduceBookQuantity(id, quantity);
	}
	
	
	public Book findBookByTitlte(String title) {
		return bookRepository.findByTitle(title);
	}
	 
	
	public void checkSoldOut(Long id, Long soldout) {
		 bookRepository.checkSoldOut(id, soldout);
	}
	
	
	public List<Object> getBookIgnoreCategory() {
		return bookRepository.findBookWithCategoryId();
	}
	
	
	 public List<Book> importBooksFromCSVFiles(MultipartFile[] files) throws IOException {
	        List<Book> allBooks = new ArrayList<>();

	        for (MultipartFile file : files) {
	            allBooks.addAll(importBooksFromCSV(file));
	        }

	        return bookRepository.saveAll(allBooks);
	    }
	 
	 private List<Book> importBooksFromCSV(MultipartFile file) throws IOException {
	        List<Book> books = new ArrayList<>();

	        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(file.getInputStream(), "UTF-8"));
	             CSVParser csvParser = new CSVParser(fileReader,
	                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim())) {

	            for (CSVRecord csvRecord : csvParser) {
	            	String title = csvRecord.get("title");
					if (bookRepository.findByTitle(title) != null) {
						 
						continue;
					}
	                Book book = new Book();
	                
	                book.setId(Long.parseLong(csvRecord.get("id")));
	                book.setTitle(title);
	                book.setAuthor(csvRecord.get("author"));
	                book.setPrice(Float.parseFloat(csvRecord.get("price")));
	                book.setImage_url(csvRecord.get("image_url"));
	                book.setRating(Float.parseFloat(csvRecord.get("rating")));
	                book.setDescription(csvRecord.get("description"));
	                book.setQuantity(Long.parseLong(csvRecord.get("quantity")));
	                book.setSoldout(Long.parseLong(csvRecord.get("soldout")));
	                Long categoryId = Long.parseLong(csvRecord.get("category_id"));
	                Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new RuntimeException("Category not found"));;
	                book.setCategory(category);
	                books.add(book);
	            }
	        }

	        return books;
	    }
	 
	 
	 


	 
	
}
