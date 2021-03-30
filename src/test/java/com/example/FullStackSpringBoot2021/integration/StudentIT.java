package com.example.FullStackSpringBoot2021.integration;

import com.example.FullStackSpringBoot2021.student.Gender;
import com.example.FullStackSpringBoot2021.student.Student;
import com.example.FullStackSpringBoot2021.student.StudentRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class StudentIT {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private StudentRepository studentRepository;

    @Test
    void itShouldAddStudent() throws Exception {
        /* Given */
        Student student = new Student("Michael", "michael@mail.com", Gender.MALE);
        /* When */
        ResultActions resultActions = mockMvc.perform(post("/api/v1/students")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(student)));
        /* Then */
        resultActions.andExpect(status().isOk());
        List<Student> studentList = studentRepository.findAll();
        assertThat(studentList).usingElementComparatorIgnoringFields("id").contains(student);
    }

    @Test
    void itShouldDeleteStudent() throws Exception {
        /* Given */
        String email = "michael@mail.com";
        Student student = new Student("Michael", email, Gender.MALE);
        mockMvc.perform(post("/api/v1/students")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(student)));
        MvcResult mvcResult = mockMvc.perform(get("/api/v1/students")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        List<Student> studentList = objectMapper.
                readValue(mvcResult.getResponse().getContentAsString(),new TypeReference<>() {});
        long studentId = studentList.stream()
                .filter(s -> s.getEmail().equals(email))
                .map(s-> s.getId())
                .findFirst()
                .orElseThrow(() -> new IllegalStateException(String.format("Student with Email %s not found", email)));
        /* When */

        ResultActions resultActions = mockMvc.perform(delete(String.format("/api/v1/students/" , studentId)));
        /* Then */
        resultActions.andExpect(status().isOk());
        boolean studentExists = studentRepository.existsById(studentId);
        assertThat(studentExists).isFalse();
    }
}
