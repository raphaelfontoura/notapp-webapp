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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class NoteService {

    NoteRepository repository;
    UserRepository userRepository;

    public NoteService(NoteRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    public Page<NoteDto> getPagedNotes(Pageable pageable) {
        Page<Note> pageNotes = repository.findAll(pageable);
        return pageNotes.map(NoteDto::new);
    }

    public NoteDto createNote(NoteInputDto dto) {
        var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = null;
        if (principal instanceof UserDetails) {
            var username = ((UserDetails) principal).getUsername();
            user = userRepository.findByEmail(username);
        }
        var note = new Note(null, dto.getNoteText(), user);
        return new NoteDto(repository.save(note));
    }

    public NoteDto getNoteById(Long id) {
        var note = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Note not found."));
        return new NoteDto(note);
    }

    public void deleteNoteById(Long id) {
        var note = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Note not found."));
        var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal != note.getUser()) {
            throw new UnauthorizedException("User not allowed.");
        }
        repository.delete(note);
    }
}
