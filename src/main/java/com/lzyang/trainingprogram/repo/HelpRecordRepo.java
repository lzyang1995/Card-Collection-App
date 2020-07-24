package com.lzyang.trainingprogram.repo;

import java.util.List;

import com.lzyang.trainingprogram.entity.HelpRecord;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface HelpRecordRepo extends PagingAndSortingRepository<HelpRecord, Long> {

    List<HelpRecord> findByUsernameAndPromotionTitle(
        String username, 
        String promotionTitle,
        Pageable pageable
    );

    Long countByUsernameAndPromotionTitle(String username, String promotionTitle);

    Long countByUsernameAndPromotionTitleAndHelper(String username, String promotionTitle, String helper);
    
}