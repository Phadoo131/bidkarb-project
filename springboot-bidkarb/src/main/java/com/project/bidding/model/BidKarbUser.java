package com.project.bidding.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.example.demo.auth.model.User;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "bidkarb_user")
public class BidKarbUser {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	long id;

//	@Column(name = "email", unique = true)
//	private String email;

	@OneToOne
	@JoinColumn(name = "username", referencedColumnName = "username")
	private User user;

	@Column(name = "first_name", length = 20 )
	String firstName;

	@Column(name = "last_name", length = 20 )
	String lastName;

	@Column(name = "full_name", length = 40 )
	String fullName;

	@Column(name = "tel_num", length = 20)
	String telNum;

	//rate of user
	@Column(name= "rate")
	private double rate;

	@OneToMany(mappedBy = "seller", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Auction> auctionsAsSeller;

	@OneToMany(mappedBy = "buyer", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Auction> auctionsAsBuyer;

//	@JsonIgnore
//	@OneToMany(mappedBy = "seller", cascade = CascadeType.ALL)
//	private List<Auction> auctions;
}

//
//package com.project.bidding.model;
//
//import javax.persistence.*;
//
//		import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Table(name = "user")
//public class OurUser {
//
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name = "user_id")
//	long id;
//
//	@Column(name = "email", nullable = false, unique = true)
//	String email;
//
//	@Column(name = "password", length = 20)
//	String password;
//
//	@Column(name = "first_name", length = 20)
//	String firstName;
//
//	@Column(name = "last_name", length = 20 )
//	String lastName;
//
//	@Column(name = "tel_num", length = 20)
//	String telNum;
//
//	//rate of user
//	@Column(name= "rate")
//	private double rate;
//
//}