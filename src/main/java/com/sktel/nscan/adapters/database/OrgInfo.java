package com.sktel.nscan.adapters.database;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.apache.ibatis.type.Alias;

/**
 * packageName    : com.sktel.nscan.adapters.database
 * fileName       : OrgInfo
 * author         : ksd83
 * date           : 2022-06-28
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-06-28        ksd83       최초 생성
 */
@Getter
@Setter
@NoArgsConstructor
@ToString
@Alias("OrgInfo")
public class OrgInfo {
    /** 대리점 관리 번호 (TG_ORG_INFO) */
    private String agn_mgmt_num;

    /** 생성_일자 (TG_ORG_INFO) */
    private String cre_dt;

    /** 생성_명 (TG_ORG_INFO) */
    private String cre_nm;

    /** 수정_일자 (TG_ORG_INFO) */
    private String upd_dt;

    /** 수정_명 (TG_ORG_INFO) */
    private String upd_nm;

    /** 조직 ID (TG_ORG_INFO) */
    private String org_id;

    /** 조직 명 (TG_ORG_INFO) */
    private String org_nm;

    /** 조직 약어 명 (TG_ORG_INFO) */
    private String org_abbr_nm;

    /** 조직 코드 (TG_ORG_INFO) */
    private String org_cd;

    /** 서브 조직 코드 (TG_ORG_INFO) */
    private String sub_org_cd;

    /** 인사 조직 코드 (TG_ORG_INFO) */
    private String hr_org_cd;

    /** 조직 출력 순번 값 (TG_ORG_INFO) */
    private String org_prt_seq_val;

    /** 부모 조직 ID (TG_ORG_INFO) */
    private String prent_org_id;

    /** 부모 조직 코드 (TG_ORG_INFO) */
    private String prent_org_cd;

    /** 부모 서브 조직 코드 (TG_ORG_INFO) */
    private String prent_sub_org_cd;

    /** 부모 조직 명 (TG_ORG_INFO) */
    private String prent_org_nm;

    /** 센터 조직 ID (TG_ORG_INFO) */
    private String cntr_org_id;

    /** 센터 조직 코드 (TG_ORG_INFO) */
    private String cntr_org_cd;

    /** 센터 서브 조직 코드 (TG_ORG_INFO) */
    private String cntr_sub_org_cd;

    /** 센터 조직 명 (TG_ORG_INFO) */
    private String cntr_org_nm;

    /** 본부 조직 ID (TG_ORG_INFO) */
    private String mkt_div_org_id;

    /** 본부 조직 코드 (TG_ORG_INFO) */
    private String mkt_div_org_cd;

    /** 본부 서브 조직 코드 (TG_ORG_INFO) */
    private String mkt_div_sub_org_cd;

    /** 본부 조직 명 (TG_ORG_INFO) */
    private String mkt_div_org_nm;

    /** 조직 분류 코드 (TG_ORG_INFO) */
    private String org_cl_cd;

    /** 조직 유형 코드 (TG_ORG_INFO) */
    private String org_typ_cd;

    /** 광역 코드 (TG_ORG_INFO) */
    private String warea_cd;

    /** 지역 코드 (TG_ORG_INFO) */
    private String area_cd;

    /** 적용 시작 일자 (TG_ORG_INFO) */
    private String aply_sta_dt;

    /** 적용 종료 일자 (TG_ORG_INFO) */
    private String aply_end_dt;

    /** 가상 조직 유형 코드 (TG_ORG_INFO) */
    private String virtual_org_typ_cd;

    /** AS 센터 유형 코드 (TG_ORG_INFO) */
    private String as_cntr_typ_cd;

    /** SPEED SHOP 등급 코드 (TG_ORG_INFO) */
    private String speed_shop_gr_cd;

    /** 주민 번호 (TG_ORG_INFO) */
    private String rest_num;

    /** 사업자 등록 번호 (TG_ORG_INFO) */
    private String bizr_rgst_num;

    /** 재고 관리 여부 (TG_ORG_INFO) */
    private String inve_mgmt_yn;

    /** 삭제 여부 (TG_ORG_INFO) */
    private String del_yn;

    /** 활성화 여부 (TG_ORG_INFO) */
    private String actvn_yn;

    /** FFM 대리점 쿼터 값 (TG_ORG_INFO) */
    private String ffm_agn_quart_val;

    /** 현 근무처 ID (TG_ORG_INFO) */
    private String curr_work_plc_id;

    /** 재무 의뢰 상태 코드 (TG_ORG_INFO) */
    private String fin_req_st_cd;

    /** 전화 번호 (TG_ORG_INFO) */
    private String phon_num;

    /** 팩스 번호 (TG_ORG_INFO) */
    private String fax_num;

    /** 우편번호 (TG_ORG_INFO) */
    private String zip;

    /** 기본 주소 (TG_ORG_INFO) */
    private String bas_addr;

    /** 상세 주소 (TG_ORG_INFO) */
    private String dtl_addr;

    /** 마케팅 조직 레벨 코드 (TG_ORG_INFO) */
    private String mktg_org_lvl_cd;

    /** 최종 변경 일시 (TG_ORG_INFO) */
    private String last_chg_dtm;

    /** 승인 처리 상태 (TG_ORG_INFO) */
    private String aprv_op_st;

    private String co_cl_cd;
}
