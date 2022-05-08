package com.example.dohyun.controller;

import com.example.dohyun.exception.ResourceNotFoundException;
import com.example.dohyun.model.User;
import com.example.dohyun.model.dto.UserMetaDataDto;
import com.example.dohyun.repository.UserRepository;
import com.example.dohyun.security.CurrentUser;
import com.example.dohyun.security.UserPrincipal;
import com.example.dohyun.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        User user = userService.getUserById(userPrincipal);
        return user;
    }

    @GetMapping("/user/feed")
    @PreAuthorize("hasRole('USER')")
    public UserMetaDataDto isThisFeed(@CurrentUser UserPrincipal userPrincipal){
        UserMetaDataDto userMetaDataDto = userService.callFeedAPI(userPrincipal);
        return userMetaDataDto;
    }

}
