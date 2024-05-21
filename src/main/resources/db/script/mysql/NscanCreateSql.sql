CREATE TABLE `ns_cd_mst` (
  `SEQ`         bigint(20)                  NOT NULL    AUTO_INCREMENT      COMMENT '순번',
  `LCL_CD`      varchar(30)                 NOT NULL                        COMMENT '대분류 코드',
  `CD_VAL`      varchar(10)                 NOT NULL                        COMMENT '코드 값',
  `LCL_NM`      varchar(70)                 NOT NULL                        COMMENT '대분류 명',
  `CD_DESC`     varchar(200)    DEFAULT         NULL                        COMMENT '코드 설명',
  `LVL`         varchar(15)     DEFAULT         NULL                        COMMENT '레벨',
  `PRENT_CD`    varchar(20)     DEFAULT         NULL                        COMMENT '부모 코드',
  `USE_YN`      varchar(1)      DEFAULT         NULL                        COMMENT '사용 여부',
  `SORT_SEQ`    int unsigned    DEFAULT         NULL                        COMMENT '정렬 순서',
  `CRE_DT`      datetime        DEFAULT         NULL                        COMMENT '생성_일자',
  `CRE_NM`      varchar(20)     DEFAULT         NULL                        COMMENT '생성_명',
  `UPD_DT`      datetime        DEFAULT         NULL                        COMMENT '수정_일자',
  `UPD_NM`      varchar(20)     DEFAULT         NULL                        COMMENT '수정_명',
  PRIMARY KEY (`LCL_CD`, `CD_VAL`),
  KEY `NS_CD_MST_IX_01`  (`SEQ`),
  KEY `NS_CD_MST_IX_02`  (`USE_YN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='NS_코드_마스터'

