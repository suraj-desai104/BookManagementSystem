package com.BookManage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.BookManage.model.Book;


@Repository
public interface BookRepo extends JpaRepository<Book,Integer>{

}
