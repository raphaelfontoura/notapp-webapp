package com.testfeefo.noteapp.repositories;

import com.testfeefo.noteapp.entities.Note;
import com.testfeefo.noteapp.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface NoteRepository extends JpaRepository<Note, Long> {

    @Query("SELECT obj FROM Note obj"
        +" WHERE (obj.user = :user)"
        +" ORDER BY obj.id DESC"
    )
    Page<Note> findAllByUser(Pageable pageable, User user);
}
