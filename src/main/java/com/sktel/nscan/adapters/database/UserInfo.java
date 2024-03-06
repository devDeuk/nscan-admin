package com.sktel.nscan.adapters.database;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.apache.ibatis.type.Alias;

import java.io.Serializable;

/**
 * packageName    : com.sktel.nscan.adapters.database
 * fileName       : UserInfo
 * author         : ksd83
 * date           : 2022-06-28
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-06-28        ksd83       최초 생성
 */
@Setter
@Getter
@NoArgsConstructor
@ToString
@Alias("UserInfo")
public class UserInfo implements Serializable{

    private String sub_org_id;

    /** 조직 ID (TG_USER) */
    private String org_id;

    /** 사용자 ID (TG_USER) */
    private String user_id;

    /** 주민 번호 (TG_USER) */
    private String rest_num;

    /** 입사 일자 (TG_USER) */
    private String wlan_dt;

    /** 퇴사 일자 (TG_USER) */
    private String retir_dt;

    /** 적용 시작 일자 (TG_USER) */
    private String aply_sta_dt;

    /** 적용 종료 일자 (TG_USER) */
    private String aply_end_dt;

    /** 사업자 등록 번호 (TG_USER) */
    private String bizr_rgst_num;

    /** 로그인 ID (TG_USER) */
    private String login_id;

    /** 소속 영업 조직 ID (TG_USER) */
    private String post_sale_org_id;

    /** 임시 소속 조직 (TG_USER) */
    private String tmp_post_org;

    /** 가망 파트너 ID (TG_USER) */
    private String pros_ptn_id;

    /** 한글 명 (TG_USER) */
    private String han_nm;

    /** 영문 명 (TG_USER) */
    private String eng_nm;

    /** 사원 번호 (TG_USER) */
    private String emp_num;

    /** SKT 정직원 직위 코드 (TG_USER) */
    private String skt_remp_pos_cd;

    /** 성별 코드 (TG_USER) */
    private String sex_cd;

    /** 업무 유형 코드 (TG_USER) */
    private String op_typ_cd;

    /** 업무 레벨 코드 (TG_USER) */
    private String op_lvl_cd;

    /** 인물 유형 코드 (TG_USER) */
    private String psn_typ_cd;

    /** 사용자 활성화 상태 코드 (TG_USER) */
    private String user_actvn_st_cd;

    /** 비밀 번호 (TG_USER) */
    private String scrt_num;

    /** 계약 시작 일자 (TG_USER) */
    private String cntrct_sta_dt;

    /** 계약 종료 일자 (TG_USER) */
    private String cntrct_end_dt;

    /** 등록 일자 (TG_USER) */
    private String rgst_dt;

    /** 만료 대상 여부 (TG_USER) */
    private String expir_obj_yn;

    /** EMAIL 주소 (TG_USER) */
    private String email_addr;

    /** 직장 전화 번호 (TG_USER) */
    private String offc_phon_num;

    /** 내선 번호 (TG_USER) */
    private String inline_num;

    /** 이동 전화 번호 (TG_USER) */
    private String mov_phon_num;

    /** 집 전화 번호 (TG_USER) */
    private String home_phon_num;

    /** 우편번호 (TG_USER) */
    private String zip;

    /** 기본 주소 (TG_USER) */
    private String bas_addr;

    /** 상세 주소 (TG_USER) */
    private String dtl_addr;

    /** SKT 직원 직군 코드 (TG_USER) */
    private String skt_emp_job_grp_cd;

    /** 원 사용자 ID (TG_USER) */
    private String orgl_user_id;

    /** 최종 변경 일시 (TG_USER) */
    private String last_chg_dtm;

    /** 대리점 코드 (TG_USER) */
    private String agn_cd;

    /** 대리점 명 (TG_USER) */
    private String agn_nm;

    /** 대리점 관리 번호 (TG_USER) */
    private String agn_mgmt_num;

    /** 대리점 관계 (TG_USER) */
    private String agn_rel;

    /** 판매 채널 (TG_USER) */
    private String sale_chnl;

    /** MTGATE 단말기 (TG_USER) */
    private String mtgate_eqp;

    /** 지정 택배 (TG_USER) */
    private String asgn_hdlv;

    /** 승인 처리 일 (TG_USER) */
    private String aprv_op_day;

    /** 승인 처리 상태 (TG_USER) */
    private String aprv_op_st;

    /** 생성_일자 (TG_USER) */
    private String cre_dt;

    /** 생성_명 (TG_USER) */
    private String cre_nm;

    /** 수정_일자 (TG_USER) */
    private String upd_dt;

    /** 수정_명 (TG_USER) */
    private String upd_nm;

    private String zip1;
    private String zip2;
    private String post_use_yn;
    private String mkt_div_org_id;
    private String sale_chnl_nm;
    private String agn_rel_nm;
    private String asgn_hdlv_nm;
    private String pwd;
    private String lcl_cd;
    private String cd_val;
    private String lcl_nm;
    private String org_typ_cd;
    private String aprv_org_st;
    private String co_cl_cd;
    private String pwd_upd_dt;
    private String pwd_enc_use_yn;
    private String cnt1;
    private String cnt2;
    private String sale_br_org_cd;
    private String p_addr;
    private String kait_sale_br_nm;        // 온라인 승낙 판매점명
    private String kait_sale_br_mgmt_cd;   // 온라인 사전승낙코드
    /** 예전 비밀 번호 (TG_USER) */
    private String old_scrt_num;
    private String org_nm;
    private String org_cd;
    private String prent_org_id;
    private String prent_org_cd;
    private String prent_org_nm;
    private String mktg_org_lvl_cd;

}
