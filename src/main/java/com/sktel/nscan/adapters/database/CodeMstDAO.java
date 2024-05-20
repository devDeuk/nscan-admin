package com.sktel.nscan.adapters.database;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.apache.ibatis.type.Alias;

/**
 * packageName    : com.sktel.nscan.adapters.database
 * fileName       : CodeMstDAO
 * author         : P069278
 * date           : 2024-05-20(0020)
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-05-20(0020)        P069278       최초 생성
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@Alias("CodeMst")
public class CodeMstDAO {
    private String lcl_cd;
    private String cd_val;
    private String lcl_nm;
    private String cd_des;
    private String lvl;
    private String prent_cd;
    private String use_yn;
    private String sort_seq;
    private String cre_dt;
    private String cre_nm;
    private String upd_dt;
    private String upd_nm;

    private String search_txt;
    private String search_gb;
}
