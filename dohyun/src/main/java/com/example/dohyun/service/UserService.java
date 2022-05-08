package com.example.dohyun.service;

import com.example.dohyun.exception.ResourceNotFoundException;
import com.example.dohyun.model.User;
import com.example.dohyun.model.dto.UserMeDto;
import com.example.dohyun.model.dto.UserMetaDataDto;
import com.example.dohyun.model.dto.UserPictureDto;
import com.example.dohyun.repository.UserRepository;
import com.example.dohyun.security.UserPrincipal;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedHashMap;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public User getUserById(UserPrincipal userPrincipal) {
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
        return user;
    }

    public UserMetaDataDto callFeedAPI(UserPrincipal userPrincipal) {
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
        String accessToken = user.getAccessToken();
        UserMeDto userMeDto = getUserMe(accessToken);
        UserMetaDataDto userMetaData = getUserMetaData(userMeDto, accessToken);
        return userMetaData;
    }

    private UserMeDto getUserMe(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

        final String url = "https://graph.facebook.com/me/?access_token=" +accessToken;
        ResponseEntity<Object> forEntity = restTemplate.getForEntity(url, Object.class);
        Object body = forEntity.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        UserMeDto userMeDto = objectMapper.convertValue(body, UserMeDto.class);
        return userMeDto;
    }

    private UserMetaDataDto getUserMetaData(UserMeDto userMeDto,String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        String id = userMeDto.getId();

        final String url = "https://graph.facebook.com/"+id+"/?fields=id,name,email,picture&access_token="+accessToken;
        ResponseEntity<Object> forEntity = restTemplate.getForEntity(url, Object.class);
        LinkedHashMap<String, Object> body = (LinkedHashMap<String, Object>) forEntity.getBody();

        UserMetaDataDto userMetaDataDto = new UserMetaDataDto();
        userMetaDataDto.setId(body.get("id").toString());
        userMetaDataDto.setName(body.get("name").toString());
        userMetaDataDto.setEmail(body.get("email").toString());

        LinkedHashMap<String, Object> picture = (LinkedHashMap<String, Object>) body.get("picture");
        LinkedHashMap<String, Object> data = (LinkedHashMap<String, Object>) picture.get("data");
        UserPictureDto userPictureDto = new UserPictureDto();
        userPictureDto.setHeight((Integer) data.get("height"));
        userPictureDto.setWidth((Integer) data.get("width"));
        userPictureDto.setUrl(data.get("url").toString());
        userPictureDto.setIs_silhouette((Boolean) data.get("is_silhouette"));

        userMetaDataDto.setPicture(userPictureDto);
        return userMetaDataDto;
    }
}
