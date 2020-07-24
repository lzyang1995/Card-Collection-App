package com.lzyang.trainingprogram.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@RequiredArgsConstructor
@Entity
@Table(name = "helprecord")
public class HelpRecord {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private final Long id;

    // @ManyToOne
    // @JoinColumn(name = "username")
    // private final User user;
    private final String username;

    // @ManyToOne
    // @JoinColumn(name = "promotiontitle")
    // private final Promotion promotion;
    @Column(name = "promotiontitle")
    private final String promotionTitle;

    // @ManyToOne
    // @JoinColumn(name = "helper")
    // private final User helper;
    private final String helper;

    @Column(name = "helpedat")
    @Temporal(TemporalType.TIMESTAMP)
    @Generated(value = GenerationTime.INSERT)
    private final Date helpedAt;

}