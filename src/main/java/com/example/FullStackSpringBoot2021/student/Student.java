package com.example.FullStackSpringBoot2021.student;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@EqualsAndHashCode
public class Student {
    private Long id;
    private String name;
    private String email;
    private Gender gender;
}
