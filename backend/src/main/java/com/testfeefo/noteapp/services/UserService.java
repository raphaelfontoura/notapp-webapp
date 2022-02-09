package com.testfeefo.noteapp.services;

import com.testfeefo.noteapp.dto.UserDto;
import com.testfeefo.noteapp.dto.UserInputDto;
import com.testfeefo.noteapp.entities.User;
import com.testfeefo.noteapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository repository;
    @Autowired
    private BCryptPasswordEncoder encoder;

    public UserDto save(UserInputDto dto) {
        var password = encoder.encode(dto.getPassword());
        User user = new User(null, dto.getUsername(), password);
        return new UserDto(repository.save(user));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("Email not found.");
        }
        return user;
    }
}
