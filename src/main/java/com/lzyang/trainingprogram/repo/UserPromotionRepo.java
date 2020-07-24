package com.lzyang.trainingprogram.repo;

import java.util.List;

import com.lzyang.trainingprogram.entity.UserPromotion;

import org.springframework.data.repository.CrudRepository;

public interface UserPromotionRepo extends CrudRepository<UserPromotion, Long> {
    
    List<UserPromotion> findByUsername(String username);

    List<UserPromotion> findByUsernameAndPromotionTitle(String username, String promotionTitle);

}