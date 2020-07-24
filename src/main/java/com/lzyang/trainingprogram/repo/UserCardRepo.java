package com.lzyang.trainingprogram.repo;

import java.util.List;

import com.lzyang.trainingprogram.entity.UserCard;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserCardRepo extends PagingAndSortingRepository<UserCard, Long> {

    List<UserCard> findByUsernameAndCardIdIsIn(
        String username, 
        List<Long> cardIdList, 
        Pageable pageable
    );

    Long countByUsernameAndCardIdIsIn(String username, List<Long> cardIdList);
    
}