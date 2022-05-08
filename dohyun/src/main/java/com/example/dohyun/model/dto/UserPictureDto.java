package com.example.dohyun.model.dto;

import lombok.Data;

@Data
public class UserPictureDto {
    private Integer height;
    private Integer width;
    private Boolean is_silhouette;
    private String url;
}
