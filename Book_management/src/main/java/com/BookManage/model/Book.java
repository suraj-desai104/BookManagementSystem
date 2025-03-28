package com.BookManage.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="book_table")
public class Book {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	@Column(name="Title")
	private String title;
	@Column(name="Author")
	private String author;
	@Column(name="Published_year")
	private int published_year;
	@Column(name="Publisher")
	private String publisher;
	@Column(name="Overview")
	private String overview;
	public Book() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Book(int id, String title, String author, int published_year, String publisher, String overview) {
		super();
		this.id = id;
		this.title = title;
		this.author = author;
		this.published_year = published_year;
		this.publisher = publisher;
		this.overview = overview;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public int getPublished_year() {
		return published_year;
	}
	public void setPublished_year(int published_year) {
		this.published_year = published_year;
	}
	public String getPublisher() {
		return publisher;
	}
	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}
	public String getOverview() {
		return overview;
	}
	public void setOverview(String overview) {
		this.overview = overview;
	}

}