package com.example.dohyun.controller;

import com.example.dohyun.exception.ResourceNotFoundException;
import com.example.dohyun.model.User;
import com.example.dohyun.repository.UserRepository;
import com.example.dohyun.security.CurrentUser;
import com.example.dohyun.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
        return user;
    }

    @GetMapping("/user/feed")
    @PreAuthorize("hasRole('USER')")
    public HashMap<String , Object> isThisFeed(){

        System.out.println("userRepository = " + userRepository);
        return null;
    }

}
