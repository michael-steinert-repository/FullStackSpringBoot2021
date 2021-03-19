package com.example.FullStackSpringBoot2021.student;

import com.example.FullStackSpringBoot2021.student.exception.BadRequestException;
import com.example.FullStackSpringBoot2021.student.exception.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public void addStudent(Student student) {
        Boolean existsEmail = studentRepository.selectEmailExists(student.getEmail());
        if (existsEmail) {
            throw new BadRequestException(String.format("Email %s is taken", student.getEmail()));
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        if (!studentRepository.existsById(studentId)) {
            throw new StudentNotFoundException(String.format("Student with id %s does not exists", studentId));
        }
        studentRepository.deleteById(studentId);
    }
}
