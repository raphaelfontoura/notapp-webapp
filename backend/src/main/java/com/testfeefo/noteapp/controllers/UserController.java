package com.testfeefo.noteapp.controllers;

import com.testfeefo.noteapp.dto.UserDto;
import com.testfeefo.noteapp.dto.UserInputDto;
import com.testfeefo.noteapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<UserDto> save(@Valid @RequestBody UserInputDto dto) {
        return ResponseEntity.ok(userService.save(dto));
    }
}
