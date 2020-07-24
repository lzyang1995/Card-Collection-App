package com.lzyang.trainingprogram.repo;

import java.util.Date;
import java.util.List;

import com.lzyang.trainingprogram.entity.Promotion;

import org.springframework.data.repository.CrudRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

public interface PromotionRepo extends CrudRepository<Promotion, String> {
    
    List<Promotion> findByTitle(String title);

    List<Promotion> findByStartDateLessThanEqualAndEndDateGreaterThanEqual(
        @DateTimeFormat(iso = ISO.DATE) Date cur1, 
        @DateTimeFormat(iso = ISO.DATE) Date cur2
    );

}