package com.testfeefo.noteapp.dto;

import com.testfeefo.noteapp.entities.Note;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class NoteDto {

    private Long id;
    private String noteText;

    public NoteDto(Note note) {
        this.id = note.getId();
        this.noteText = note.getNoteText();
    }

}
