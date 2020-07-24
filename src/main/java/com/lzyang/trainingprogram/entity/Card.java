package com.lzyang.trainingprogram.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@RequiredArgsConstructor
@Entity
@Table(name = "card")
public class Card {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private final Long id;

    @Column(name = "cardname")
    private final String cardName;

    @Column(name = "cardimage")
    @Lob
    private final byte[] cardImage;

    private final double probability;

    // @ManyToOne
    // @JoinColumn(name = "promotiontitle")
    // private final Promotion promotion;
    @Column(name = "promotiontitle")
    private final String promotionTitle;

}