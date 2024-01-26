package com.example.demo.auth.controller;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.auth.model.User;
import com.example.demo.auth.payload.JwtResponse;
import com.example.demo.auth.repository.UserRepository;
import com.example.demo.auth.service.UserDetailsImpl;

@RestController
@RequestMapping("/user")
public class UserInfoController {
	
	  @Autowired
	  UserRepository userRepository;


	  @GetMapping("/me")
	    public ResponseEntity<?> getUser(@AuthenticationPrincipal UserDetails principal) {
	        
		  UserDetailsImpl userDetails = (UserDetailsImpl) principal;
		  List<String> roles = userDetails.getAuthorities().stream()
			        .map(item -> item.getAuthority())
			        .collect(Collectors.toList());
		  
		  HashMap map = new HashMap();
		  map.put("id", userDetails.getId());
		  map.put("name", userDetails.getUsername());
		  map.put("email" , userDetails.getEmail());
		  map.put("roles", roles);
		  return ResponseEntity.ok(map);
	    }
}
