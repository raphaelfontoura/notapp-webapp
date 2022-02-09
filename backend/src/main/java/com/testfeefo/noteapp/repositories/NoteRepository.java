package com.testfeefo.noteapp.repositories;

import com.testfeefo.noteapp.entities.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {
}
