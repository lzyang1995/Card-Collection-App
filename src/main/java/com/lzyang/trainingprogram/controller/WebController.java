package com.lzyang.trainingprogram.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class WebController {
    
    @GetMapping("/")
    public String indexPage() {
        return "index";
    }

    @GetMapping("/{path:^(?!api$).+$}")
    public String pathPage(@PathVariable("path") String path, Model model) {
        model.addAttribute("jsFileName", path + ".js");

        return "template";
    }

    @GetMapping("/promotion/{title}")
    public String promotionDetailPage(Model model) {
        model.addAttribute("jsFileName", "promotionDetail.js");

        return "template";
    }

    @GetMapping("/invite/{username}/{title}")
    public String invitePage(Model model) {
        model.addAttribute("jsFileName", "invite.js");

        return "template";
    }

}