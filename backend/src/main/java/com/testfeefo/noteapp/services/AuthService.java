package com.testfeefo.noteapp.services;

import com.testfeefo.noteapp.entities.User;
import com.testfeefo.noteapp.repositories.UserRepository;
import com.testfeefo.noteapp.services.exceptions.UnauthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public User authenticated() {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            return userRepository.findByEmail(username);
        } catch (Exception ex) {
            throw new UnauthorizedException("Invalid user");
        }
    }
}
