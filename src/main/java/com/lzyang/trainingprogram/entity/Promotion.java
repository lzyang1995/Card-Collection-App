package com.lzyang.trainingprogram.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@RequiredArgsConstructor
@Entity
@Table(name = "promotion")
public class Promotion {
    
    @Id
    private final String title;

    @Lob
    private final byte[] image;

    @Column(name = "startdate")
    @Temporal(TemporalType.TIMESTAMP)
    private final Date startDate;

    @Column(name = "enddate")
    @Temporal(TemporalType.TIMESTAMP)
    private final Date endDate;

    @Column(name = "ruletext")
    private final String ruleText;

}