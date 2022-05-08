package com.example.dohyun.model.dto;

import lombok.Data;

@Data
public class UserMetaDataDto {
    private String id;
    private String name;
    private String email;
    private UserPictureDto picture;
}
