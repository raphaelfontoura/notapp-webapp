package com.testfeefo.noteapp.dto;

import com.testfeefo.noteapp.entities.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class UserDto {

    private Long id;
    private String username;

    public UserDto(User entity) {
        this.id = entity.getId();
        this.username = entity.getUsername();
    }
}
