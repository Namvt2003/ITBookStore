package com.example.demo.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Book;
import com.example.demo.service.BookService;

@RestController
@RequestMapping("/api/fileinput")
@CrossOrigin(origins = "http://localhost:4200")

public class FileInputController {
	
	
	
	@Autowired
	private BookService bookService;
	
	
	@PostMapping()
	public ResponseEntity<String> uploadCSVFiles(@RequestParam("files") MultipartFile[] files) {
        if (files.length == 0) {
            return ResponseEntity.badRequest().body("Please select files to upload");
        }

        try {
            List<Book> importedBooks = bookService.importBooksFromCSVFiles(files);
            return ResponseEntity.ok("Files uploaded and processed successfully. Imported " + importedBooks.size() + " books.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to process files: " + e.getMessage());
        }
    }

}
