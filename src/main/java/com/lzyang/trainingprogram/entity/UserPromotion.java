package com.lzyang.trainingprogram.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "user_promotion")
public class UserPromotion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // @ManyToOne
    // @JoinColumn(name = "username")
    // private final User user;
    private String username;

    // @ManyToOne
    // @JoinColumn(name = "promotiontitle")
    // private final Promotion promotion;
    @Column(name = "promotiontitle")
    private String promotionTitle;

    private int chances;

    @Column(name = "haveinvited")
    private int haveInvited;

}