package com.testfeefo.noteapp.controllers;

import com.testfeefo.noteapp.dto.NoteDto;
import com.testfeefo.noteapp.dto.NoteInputDto;
import com.testfeefo.noteapp.services.NoteService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping(value = "/api/v1/notes")
public class NoteController {

    private NoteService service;

    public NoteController(NoteService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<Page<NoteDto>> getPagedNotes(Pageable pageable) {
        Page<NoteDto> pageNotes = service.getPagedNotes(pageable);
        return ResponseEntity.ok(pageNotes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteDto> getNoteById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getNoteById(id));
    }

    @PostMapping
    public ResponseEntity<NoteDto> saveNewNote(@Valid @RequestBody NoteInputDto dto) {
        NoteDto noteSaved = service.createNote(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(noteSaved.getId()).toUri();
        return ResponseEntity.created(uri).body(noteSaved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNoteById(@PathVariable Long id) {
        service.deleteNoteById(id);
        return ResponseEntity.noContent().build();
    }

}
