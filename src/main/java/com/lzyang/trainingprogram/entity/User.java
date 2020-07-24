package com.lzyang.trainingprogram.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "user")
public class User {

    @Id
    private String username;
    
    private String password;
    private String nickname;
    private String gender;

    @Column(name = "phonenumber")
    private String phoneNumber;

    // @OneToMany(
    //     mappedBy = "user",
    //     cascade = CascadeType.ALL,
    //     orphanRemoval = true
    // )
    // private final List<UserPromotion> promotions = new ArrayList<>();

    // @OneToMany(
    //     mappedBy = "user",
    //     cascade = CascadeType.ALL,
    //     orphanRemoval = true
    // )
    // private final List<UserCard> cards = new ArrayList<>();
    
}