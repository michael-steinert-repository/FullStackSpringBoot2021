package com.example.FullStackSpringBoot2021.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/students")
public class StudentController {

    @GetMapping
    public List<Student> getAllStudents() {
        return Arrays.asList(
                new Student(1L, "Michael", "michael@mail.com", Gender.MALE),
                new Student(2L, "Marie", "marie@mail.com", Gender.FEMALE));
    }
}
