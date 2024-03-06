package com.sktel.nscan.domain.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * packageName    : com.sktel.nscan.domain.board.controller
 * fileName       : BoardController
 * author         : ksd83
 * date           : 2022-06-23
 * description    : 공지사항, board 관련 요청 컨트롤러
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-06-23        ksd83       최초 생성
 */
@Controller
@RequestMapping("/board")
public class BoardController {


    /**
     * 공지사항 리스트
     * @return
     */
    @GetMapping("/annceLst")
    public String annceLst(){
        return "board/annceLst";
    }

    /**
     * 공지사항 insert
     * @return
     */
    @GetMapping("/annceIns")
    public String annceIns(){
        return "board/annceIns";
    }

    /**
     * 공지사항 상세
     *
     * @return
     */
    @GetMapping("/annceDtl")
    public String annceDtl(){
        return "board/annceDtl";
    }


}
