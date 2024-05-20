-- code master
CREATE TABLE `ns_cd_mst` (
  `LCL_CD` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '대분류 코드',
  `CD_VAL` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '코드 값',
  `LCL_NM` varchar(70) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '대분류 명',
  `CD_DESC` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '코드 설명',
  `LVL` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '레벨',
  `PRENT_CD` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '부모 코드',
  `USE_YN` varchar(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '사용 여부',
  `SORT_SEQ` bigint unsigned DEFAULT NULL COMMENT '정렬 순서',
  `CRE_DT` datetime DEFAULT NULL COMMENT '생성_일자',
  `CRE_NM` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '생성_명',
  `UPD_DT` datetime DEFAULT NULL COMMENT '수정_일자',
  `UPD_NM` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '수정_명',
  `LCL_NM_EN` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  PRIMARY KEY (`LCL_CD`,`CD_VAL`),
  KEY `TG_CD_MST_IX_01` (`USE_YN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='NS_코드_마스터'

