package com.testfeefo.noteapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Setter @Getter
public class UserInputDto {

    @NotNull
    @Email
    private String username;
    @NotNull
    private String password;

}
