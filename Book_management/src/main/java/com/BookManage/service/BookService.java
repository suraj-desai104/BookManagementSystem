package com.BookManage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BookManage.model.Book;
import com.BookManage.repository.BookRepo;



@Service
public class BookService {
	
	 @Autowired
		private BookRepo bookrep;
	    
	    public List<Book> getAllBook()
		{
			return bookrep.findAll();
		}
		
		public Book getBookById(Integer id)
		{
			return bookrep.findById(id).orElseThrow();
		}
		public Book saveBook(Book book)
		{
			return bookrep.save(book);
		}
		public void deleteBookbyId(Integer id)
		{
			bookrep.deleteById(id);
		}


}
