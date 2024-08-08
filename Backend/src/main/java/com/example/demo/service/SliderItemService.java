package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.example.demo.entity.SliderItem;
import com.example.demo.repository.SliderItemRepository;

@Service
public class SliderItemService {

    private static final Logger logger = LoggerFactory.getLogger(SliderItemService.class);

    @Autowired
    private SliderItemRepository sliderItemRepository;

    public List<SliderItem> getAllSliderItems() {
        List<SliderItem> items = sliderItemRepository.findAll();
        logger.info("Retrieved {} slider items", items.size());
        for (SliderItem item : items) {
            logger.info("Slider Item: id={}, image_url={}", item.getId(), item.getImage_url());
        }
        return items;
    }

    public SliderItem getSliderItemById(Long id) {
        SliderItem item = sliderItemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Slider not found!"));
        logger.info("Retrieved slider item: id={}, image_url={}", item.getId(), item.getImage_url());
        return item;
    }
}