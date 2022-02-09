package com.testfeefo.noteapp.services;

import com.testfeefo.noteapp.dto.NoteDto;
import com.testfeefo.noteapp.dto.NoteInputDto;
import com.testfeefo.noteapp.entities.Note;
import com.testfeefo.noteapp.entities.User;
import com.testfeefo.noteapp.repositories.NoteRepository;
import com.testfeefo.noteapp.repositories.UserRepository;
import com.testfeefo.noteapp.services.exceptions.ResourceNotFoundException;
import com.testfeefo.noteapp.services.exceptions.UnauthorizedException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
public class NoteService {

    NoteRepository repository;
    UserRepository userRepository;
    AuthService authService;

    public NoteService(NoteRepository repository, UserRepository userRepository, AuthService authService) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.authService = authService;
    }

    @Transactional(readOnly = true)
    public Page<NoteDto> getPagedNotes(Pageable pageable) {
        User user = authService.authenticated();
        Page<Note> pageNotes = repository.findAllByUser(pageable, user);
        return pageNotes.map(NoteDto::new);
    }

    public NoteDto createNote(NoteInputDto dto) {
        User user = authService.authenticated();
        var note = new Note(null, dto.getNoteText(), user);
        return new NoteDto(repository.save(note));
    }

    @Transactional(readOnly = true)
//    @PostFilter("filterObject.user.username == authentication.principal.username")
    public NoteDto getNoteById(Long id) {
        var note = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Note not found."));
        User user = authService.authenticated();
        if (note.getUser() != user) throw new UnauthorizedException("Resource access not allowed");
        return new NoteDto(note);
    }

    public void deleteNoteById(Long id) {
        var note = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Note not found."));
        var user = authService.authenticated();

        if (!Objects.equals(user.getUsername(), note.getUser().getEmail())) {
            throw new UnauthorizedException("User not allowed.");
        }
        repository.delete(note);
    }
}
