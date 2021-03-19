package com.example.FullStackSpringBoot2021.student;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
class StudentRepositoryTest {
    @Autowired
    private StudentRepository studentRepository;

    @AfterEach
    void tearDown() {
        studentRepository.deleteAll();
    }

    @Test
    void itShouldSelectEmailExists() {
        /* Given */
        String email = "michael@mail.com";
        Student student = new Student("Michael", email, Gender.MALE);
        studentRepository.save(student);
        /* When */
        boolean emailExists = studentRepository.selectEmailExists(email);
        /* Then */
        assertThat(emailExists).isTrue();
    }

    @Test
    void itShouldSelectEmailNotExists() {
        /* Given */
        String email = "michael@mail.com";
        /* When */
        boolean emailExists = studentRepository.selectEmailExists(email);
        /* Then */
        assertThat(emailExists).isFalse();
    }
}