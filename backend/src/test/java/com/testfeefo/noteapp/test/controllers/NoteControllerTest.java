package com.testfeefo.noteapp.test.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.testfeefo.noteapp.dto.NoteDto;
import com.testfeefo.noteapp.dto.NoteInputDto;
import com.testfeefo.noteapp.services.NoteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@Transactional
public class NoteControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private NoteService service;
    @Autowired
    private ObjectMapper objectMapper;
    private String baseurl = "/api/v1/notes";

    @Value("${security.oauth2.client.client-id}")
    private String clientId;
    @Value("${security.oauth2.client.client-secret}")
    private String clientSecret;

    private String token;

    @BeforeEach
    void setUp() throws Exception {
        token = obtainAccessToken("user@email.com", "123456");
    }

    @Test
    void insert_shouldReturnNoteDto_whenValidNoteInformed() throws Exception {
        //arrange
        NoteInputDto input = new NoteInputDto("Note for test");
        NoteDto dto = new NoteDto(1L,input.getNoteText());
        when(service.createNote(any(NoteInputDto.class))).thenReturn(dto);
        String jsonInput = objectMapper.writeValueAsString(input);

        //act and assert
        mockMvc.perform(post(baseurl)
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonInput)
                .header("Authorization", "Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists());
    }

    @Test
    void get_shouldReturnListOfNoteDto_whenTokenValid() throws Exception {
        //arrange
        NoteDto dto = new NoteDto(1L,"note 1");
        NoteDto dto2 = new NoteDto(2L, "note 2");
        var page = new PageImpl<>(List.of(dto, dto2));
        when(service.getPagedNotes(any())).thenReturn(page);

        //act and assert
        mockMvc.perform(get(baseurl)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer "+token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.content[0].id").value(1L));
    }

    @Test
    void get_shouldReturnUnauthorized_whenTokenNotExist() throws Exception {
        //arrange
        NoteDto dto = new NoteDto(1L,"note 1");
        NoteDto dto2 = new NoteDto(2L, "note 2");
        var page = new PageImpl<>(List.of(dto, dto2));
        when(service.getPagedNotes(any())).thenReturn(page);

        //act and assert
        mockMvc.perform(get(baseurl)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void delete_shouldNothing_whenTokenNotExist() throws Exception {
        //arrange

        //act and assert
        mockMvc.perform(delete(baseurl+"/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer "+token))
                .andExpect(status().isNoContent());
    }

    private String obtainAccessToken(String username, String password) throws Exception {

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "password");
        params.add("client_id", clientId);
        params.add("username", username);
        params.add("password", password);

        ResultActions result
                = mockMvc.perform(post("/oauth/token")
                        .params(params)
                        .with(httpBasic(clientId, clientSecret))
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"));

        String resultString = result.andReturn().getResponse().getContentAsString();

        JacksonJsonParser jsonParser = new JacksonJsonParser();
        return jsonParser.parseMap(resultString).get("access_token").toString();
    }
}
