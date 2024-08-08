package com.example.demo.entity;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "orders")
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private Long id;
	
	
	@Column(name = "customer_name", nullable = false)
	private String customer_name;
	
	
	@Column(name = "address", nullable = false)
	private String address;
	
	
	@Column(name = "quantity", nullable = false)
	private Long quantity;
	
	
	@Column(name = "totalprice", nullable = false)
	private Float totalprice;
	
	@Column(name = "checkedout", columnDefinition = "TINYINT(1)")
	private Boolean checkedout;
	
	@Column(name = "done", columnDefinition = "TINYINT(1)")
	private Boolean done;
	
	
	
	 
	@Column(name = "paymentmethod", nullable= false)
	private Long paymentmethod;
	
	
	public Long getPaymentmethod() {
		return paymentmethod;
	}

	public void setPaymentmethod(Long paymentmethod) {
		this.paymentmethod = paymentmethod;
	}

	@Column(name = "phonenumber", nullable = false)
	private String phonenumber;
	
	@ElementCollection
	@CollectionTable(name = "order_booknames")
	@Column(name = "bookname")
	private List<String> booknames;
	
	
	 @OneToMany(mappedBy = "order_id")
	 private List<OrderBookNames> orderBooknames;
	
	 
	
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCustomer_name() {
		return customer_name;
	}

	public void setCustomer_name(String customer_name) {
		this.customer_name = customer_name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Long getQuantity() {
		return quantity;
	}

	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}

	public Float getTotalprice() {
		return totalprice;
	}

	public void setTotalprice(Float totalprice) {
		this.totalprice = totalprice;
	}

	public Boolean getCheckedout() {
		return checkedout;
	}

	public void setCheckedout(Boolean checkedout) {
		this.checkedout = checkedout;
	}

	public Boolean getDone() {
		return done;
	}

	public void setDone(Boolean done) {
		this.done = done;
	}

	 

	public String getPhonenumber() {
		return phonenumber;
	}

	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}

	public List<String> getBooknames() {
		return booknames;
	}

	public void setBooknames(List<String> booknames) {
		this.booknames = booknames;
	}

	
	
	
	
	
	
	
	
	
	
	
}
