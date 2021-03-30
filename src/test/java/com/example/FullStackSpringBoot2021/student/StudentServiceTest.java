package com.example.FullStackSpringBoot2021.student;

import com.example.FullStackSpringBoot2021.student.exception.BadRequestException;
import com.example.FullStackSpringBoot2021.student.exception.StudentNotFoundException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

class StudentServiceTest {
    @Mock
    private StudentRepository studentRepository;
    @Captor
    ArgumentCaptor<Student> studentArgumentCaptor;
    private AutoCloseable autoCloseable;
    private StudentService studentService;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        studentService = new StudentService(studentRepository);
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void itShouldGetAllStudents() {
        /* Given */
        /* When */
        studentService.getAllStudents();
        /* Then */
        /* The Method verify() verifies that the Method findAll() is invoked in the Repository */
        verify(studentRepository).findAll();
    }

    @Test
    void itShouldAddStudent() {
        /* Given */
        Student student = new Student("Michael", "michael@mail.com", Gender.MALE);
        /* When */
        studentService.addStudent(student);
        /* Then */
        /* The Method verify() verifies that the Method save() is invoked in the Repository */
        /* The Method capture() captures the Value in the Method save() */
        verify(studentRepository).save(studentArgumentCaptor.capture());
        Student capturedStudent = studentArgumentCaptor.getValue();
        assertThat(capturedStudent).isEqualTo(student);
    }

    @Test
    void itShouldThrowAnExceptionWhenEmailExists() {
        /* Given */
        Student student = new Student("Michael", "michael@mail.com", Gender.MALE);
        /* The Method given() will return the Value which it passed to it */
        given(studentRepository.selectEmailExists(anyString())).willReturn(true);
        /* When */
        /* Then */
        assertThatThrownBy(() -> studentService.addStudent(student))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining(String.format("Email %s is taken", student.getEmail()));
    }

    @Test
    void itShouldDeleteStudent() {
        /* Given */
        long studentId = 1L;
        given(studentRepository.existsById(studentId)).willReturn(true);
        /* When */
        studentRepository.deleteById(studentId);
        /* Then */
        verify(studentRepository).deleteById(studentId);
    }

    @Test
    void itThrownAnExceptionWhenShouldDeleteStudent() {
        /* Given */
        long studentId = 1L;
        given(studentRepository.existsById(studentId)).willReturn(false);
        /* When */
        /* Then */
        assertThatThrownBy(() -> studentService.deleteStudent(studentId))
                .isInstanceOf(StudentNotFoundException.class)
                .hasMessageContaining(String.format("Student with id %s does not exists", studentId));

        verify(studentRepository, never()).deleteById(any());
    }
}