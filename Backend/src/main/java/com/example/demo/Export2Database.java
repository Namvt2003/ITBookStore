package com.example.demo;

import java.io.IOException;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.example.demo.entity.Book;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;

public class Export2Database {
	private XSSFWorkbook workbook;
	 private XSSFSheet sheet;
	    private List<Book> listBooks;

	    public Export2Database(List<Book> listBooks) throws IOException {
	        this.listBooks = listBooks;
	        workbook = new XSSFWorkbook();
	    }

	    private void writeHeaderLine(){
	        sheet = workbook.createSheet("Students");
	        Row row = sheet.createRow(0);
	        CellStyle style = workbook.createCellStyle();
	        XSSFFont font = workbook.createFont();
	        font.setBold(true);
	        font.setFontHeight(16);
	        style.setFont(font);

	        createCell(row, 0, "Student ID", style);
	        createCell(row, 1, "Name", style);
	        createCell(row,2,"Class Name",style);

	    }


	    private void createCell(Row row, int columnCount, Object value, CellStyle style){
	            sheet.autoSizeColumn(columnCount);
	            Cell cell = row.createCell(columnCount);
	            if(value instanceof Boolean){
	                cell.setCellValue((Boolean)value);
	            }
	            else {
	                cell.setCellValue((String)value);
	            }
	            cell.setCellStyle(style);
	    }
	    private void writeDataLine(){
	        int rowCount = 1;
	        CellStyle style = workbook.createCellStyle();
	        XSSFFont font = workbook.createFont();
	        font.setFontHeight(14);
	        style.setFont(font);
	        for(Book book : listBooks){
	            Row row = sheet.createRow(rowCount++);
	            int columnCount = 0;

	            createCell(row, columnCount++, book.getId(), style);
	            createCell(row, columnCount++, book.getTitle(), style);
	            createCell(row,columnCount++, book.getAuthor(), style);
	            createCell(row,columnCount++, book.getPrice(), style);
	            createCell(row,columnCount++, book.getImage_url(), style);
	            createCell(row,columnCount++, book.getRating(), style);
	            createCell(row,columnCount++, book.getDescription(), style);
	            createCell(row,columnCount++, book.getQuantity(), style);
	            createCell(row,columnCount++, book.getSoldout(), style);
	            createCell(row,columnCount++, book.getCategory(), style);
	            
	            

	        }
	    }
	    public void export(HttpServletResponse response) throws IOException {
	            writeHeaderLine();
	            writeDataLine();
	        ServletOutputStream outputStream = response.getOutputStream();
	        workbook.write(outputStream);
	        workbook.close();
	        outputStream.close();

	    }

}
