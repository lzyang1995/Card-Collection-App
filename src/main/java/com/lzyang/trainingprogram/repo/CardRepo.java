package com.lzyang.trainingprogram.repo;

import java.util.List;

import com.lzyang.trainingprogram.entity.Card;

import org.springframework.data.repository.CrudRepository;

public interface CardRepo extends CrudRepository<Card, Long> {

    List<Card> findByPromotionTitle(String promotionTitle);
    
}