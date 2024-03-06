package com.sktel.nscan.common.utils;

import icasApi.AuthICAS;
import icasApi.GetICAS;
import icasApi.ICASConfig;
import icasApi.common.CommDebug;
import icasApi.common.CommRecord;
import lombok.extern.slf4j.Slf4j;

import java.util.*;


@Slf4j
public class SvcMgmtUtil {

	private static String EMPTY = "";

//	private static String imsIP ="220.103.253.169";	//Swing 개발: ICAS 프로젝트 스테이징 L4 ( 220.103.253.169 nicasims.sktelecom.com )
//	private static String imsIP ="220.103.253.230";	//운영
//	private static String imsIP ="";                //운영 공백일 경우 도메인으로 호출
//	private static int imsPort =2005;

	//TODO 환경에 따라 설정변경되도록 수정
	//private static String imsIP ="220.103.253.250";	    //개발
	//private static int imsPort=2005;

	private static String icasLogDir;
	private static String imsIP;
	private static int imsPort;
	private static String icasCpId;
	private static String icasCpPwd;
	private static String icasCpKey;

	public static void  setIcasLogDir(String icasLogDir) {
		SvcMgmtUtil.icasLogDir = icasLogDir;
	}
	public static void  setIcasImsIp(String imsIP) {
		SvcMgmtUtil.imsIP = imsIP;
	}
	public static void  setIcasImsPort(int imsPort) {
		SvcMgmtUtil.imsPort = imsPort;
	}
	public static void  setIcasCpId(String icasCpId) {
		SvcMgmtUtil.icasCpId = icasCpId;
	}
	public static void  setIcasCpPwd(String icasCpPwd) {
		SvcMgmtUtil.icasCpPwd = icasCpPwd;
	}
	public static void  setIcasCpKey(String icasCpKey) {
		SvcMgmtUtil.icasCpKey = icasCpKey;
	}

	public SvcMgmtUtil() {}

	/**
	 * 서비스 관리번호 조회
	 * getIcasInfo
	 *
	 * @param svcNum
	 * @return
	 * @throws Exception String
	 */
	public static String getIcasInfo(String svcNum) throws Exception {
		String SVCMGMTNUM=EMPTY;

		try {
			//SystemConfig systemConfig = SystemConfig.getInstance();
			//String FILEDIR_ICASLOG_TGATE = systemConfig.propertiesGetConfig("FILEDIR_ICASLOG_TGATE");

			if(svcNum!=null && !EMPTY.equals(svcNum.trim())) {
				if(svcNum.length() == 10 || svcNum.length() == 11) {
					svcNum = setSvcNumMidZero(svcNum);

					// 1. GetICAS Object 생성
					// CpId, CpPw16자리, CpKey32자리, CpKeyId, Timeout default 3초
					// AuthICAS  oAuthICAS = new AuthICAS("testId", "testPw", "0123456789abcdef", 5000);
					// 2016.11.09 ICAS Client 변경
					//GetICAS oGetICAS = new GetICAS("WPSM1222", "3c350fd1543f5de8", "b1aa654327a645e4a41243787c779e1d", "A");
					GetICAS oGetICAS = new GetICAS(icasCpId, icasCpPwd, icasCpKey, "A");

					// 1-1. 로그위치 설정
					//oGetICAS.setLogPath(FILEDIR_ICASLOG_TGATE);    // 미 작성시 오류코드 : 3505
					oGetICAS.setLogPath(icasLogDir);    // 미 작성시 오류코드 : 3505

					// 2. Call할 Method 설정
					oGetICAS.addMethod("GetCustomersSV");

					// 3. 조회 조건 Object 생성
					CommRecord oReqValue = new CommRecord();
					oReqValue.addValue("SVC_NUM", svcNum);

					// 4. 조회 조건 Object 설정
					oGetICAS.addParam(oReqValue);

					// 5. Method Call
					// log.info("IP : " + imsIP + "PORT : " + imsPort);
					int error = getCallRsltGetICAS(oGetICAS, imsIP, imsPort);

					if(error!=0) {
						log.error("서비스번호"+svcNum+"API<=>AIMS return : " + error);
					}

					for(int i=0; oGetICAS.vcRetVal != null
							&& i < oGetICAS.vcRetVal.size(); i++) {
						CommRecord recordICAS = (CommRecord)oGetICAS.vcRetVal.get(i);

						log.debug("ZSVC_SVC_MGMT_NUM= " + recordICAS.getAttribute("ZSVC_SVC_MGMT_NUM"));

						SVCMGMTNUM = recordICAS.getAttribute("ZSVC_SVC_MGMT_NUM");
						log.info("서비스관리번호 : " + SVCMGMTNUM);
					}

					// 6. Object 초기화
					oGetICAS.clear();
				}
			}
		} catch (Exception e) {
			//e.printStackTrace();
			log.debug(e.getMessage());
		}
		return SVCMGMTNUM;
	}

	/**
	 * 태블릿 할부 1회선 이상 신청 개발 추가 (14.02.10)
	 * (ICAS 단말기코드 받아와 TSHOP에서 태블릿 여부 조회 시 사용)
	 * @param svcNum
	 * @return
	 * @throws Exception String
	 */
	public static String getIcasEqpCd(String svcNum) throws Exception {
		String EQUIPMODLCD=EMPTY;

		try {
			//SystemConfig systemConfig = SystemConfig.getInstance();
			//String FILEDIR_ICASLOG_TGATE = systemConfig.propertiesGetConfig("FILEDIR_ICASLOG_TGATE");

			if(svcNum!=null && !EMPTY.equals(svcNum.trim())) {
				if(svcNum.length() == 10 || svcNum.length() == 11) {
					svcNum = setSvcNumMidZero(svcNum);

					// 1. GetICAS Object 생성
					// CpId, CpPw16자리, CpKey32자리, CpKeyId, Timeout default 3초

					// 2016.11.09 ICAS Client 변경 적용
					//GetICAS oGetICAS = new GetICAS("WPSM1222", "3c350fd1543f5de8", "b1aa654327a645e4a41243787c779e1d", "A");
					GetICAS oGetICAS = new GetICAS(icasCpId, icasCpPwd, icasCpKey, "A");

					// 1-1. 로그위치 설정
					//oGetICAS.setLogPath(FILEDIR_ICASLOG_TGATE);    // 미 작성시 오류코드 : 3505
					oGetICAS.setLogPath(icasLogDir);    // 미 작성시 오류코드 : 3505

					// 2. Call할 Method 설정
					oGetICAS.addMethod("GetCustomersSV");

					// 3. 조회 조건 Object 생성
					CommRecord oReqValue = new CommRecord();
					oReqValue.addValue("SVC_NUM", svcNum);

					// 4. 조회 조건 Object 설정
					oGetICAS.addParam(oReqValue);

					// 5. Method Call
					// log.info("IP : " + imsIP + "PORT : " + imsPort);
					int error = getCallRsltGetICAS(oGetICAS, imsIP, imsPort);

					if(error!=0) {
						log.error("서비스번호"+svcNum+"API<=>AIMS return : " + error);
					}

					for(int i=0; oGetICAS.vcRetVal != null
							&& i < oGetICAS.vcRetVal.size(); i++) {
						CommRecord recordICAS = (CommRecord)oGetICAS.vcRetVal.get(i);

						log.debug("EQP_MDL_CD = "
								+ recordICAS.getAttribute("EQP_MDL_CD"));

						EQUIPMODLCD = recordICAS.getAttribute("EQP_MDL_CD");
					}
					// 6. Object 초기화
					oGetICAS.clear();
				}
			}
		} catch (Exception e) {
			//e.printStackTrace();
			log.debug(e.getMessage());
		}

		return EQUIPMODLCD;
	}

	/**
	 * <pre>
	 * 명의자주민번호일치여부 확인
	 * <pre>
	 * @param svcNum
	 * @param ctz_corp_num
	 * @return
	 * @throws Exception String
	 */
	public static String getIcasInfo_dtl(String svcNum, String ctz_corp_num) throws Exception {
		String svc = EMPTY;

		try {

			// 1. AuthICAS Object 생성
			// CpId, CpPw16자리, CpKey32자리, CpKeyId, Timeout default 3초
			// AuthICAS  oAuthICAS = new AuthICAS("testId", "testPw", "0123456789abcdef", 5000);
			// 2016.11.09 ICAS Client 변경
			//AuthICAS oAuthICAS = new AuthICAS("WPSM1222", "3c350fd1543f5de8", "b1aa654327a645e4a41243787c779e1d", "A");
			AuthICAS oAuthICAS = new AuthICAS(icasCpId, icasCpPwd, icasCpKey, "A");

			// 2. Call할 Method 설정
			oAuthICAS.addMethod("AuthCtrRgstNumEqualSV"); //AuthCtrRgstNumEqualSV
			oAuthICAS.setLogPath(icasLogDir);

			// 3. 조회 조건 Object 생성
			// key하나에 여러개의 value가 들어올때는 '~'로 구성하여 보낸다.
			CommRecord oReqValue = new CommRecord();
			// 이번 개선으로 Input Parameter의 명칭이 모두 변경되었습니다.
			oReqValue.addValue("SVC_MGMT_NUM", svcNum);
			oReqValue.addValue("CTZ_CORP_NUM", ctz_corp_num);

//	        oReqValue.addValue("CTZ_CORP_NUM", ctz_corp_num);
//	        oReqValue.addValue("CTZ_CORP_NUM", "01046075496");
//	        oReqValue.addValue("SVC_NUM", "01067311472");
//	        oReqValue.addValue("SSN_BIRTH_DT", "830620");
//	        oReqValue.addValue("SSN_SEX_CD", "1");
//	        oReqValue.addValue("CUST_NM", "석국징");

			// 4. 조회 조건 Object 설정
			oAuthICAS.addParam(oReqValue);

			// 5. Method Call
			// log.info("IP : " + imsIP + "PORT : " + imsPort);
			int error = getCallRsltAuthICAS(oAuthICAS, imsIP, imsPort);

			//log.info("API<=>AIMS return : " + error);
			// 6. Object 초기화
			oAuthICAS.clear();

			// error = 0 : success (존재함)
			// error = x : 기타에러 (코드제공예정)

			//output 결과값
			//	3156 : REQUIRED_PARAMETER_IS_EMPTY(F)
			//	3401 : REQUIRED_PARAMETER_IS_INVALID(F)
			//	3101 : DB_NO_ROW_SELECTED (F)
			//	3151 : TOO_MANY_ROWS (F)
			// 	3436 : 명의자 주민번호 일치(Y)
			// 	3437 : 명의자 주민번호 불일치(N)
			//	3501 : conntecion 에러
			//	3502 : Parameter 에러
			//	4102 : INVALID_CUST_INFO

			if("3436".equals(error+EMPTY)){
				svc = "Y";
			}else{
				svc = "N";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return svc;
	}

	public static Map<String,Object> getIcasInfo_dtl_twd(String svcNum, String ctz_corp_num) throws Exception {
		Map<String,Object> svcMgmtNumChkMap = new HashMap<String, Object>();
		String svcMgmtNumChk = EMPTY;
		String CST_CUST_NUM  = EMPTY;

		try {

			// 1. AuthICAS Object 생성
			// CpId, CpPw16자리, CpKey32자리, CpKeyId, Timeout default 3초
			// AuthICAS  oAuthICAS = new AuthICAS("testId", "testPw", "0123456789abcdef", 5000);
			// 2016.11.09 ICAS Client 변경
			//AuthICAS oAuthICAS = new AuthICAS("WPSM1222", "3c350fd1543f5de8", "b1aa654327a645e4a41243787c779e1d", "A");
			AuthICAS oAuthICAS = new AuthICAS(icasCpId, icasCpPwd, icasCpKey, "A");

			// 2. Call할 Method 설정
			oAuthICAS.addMethod("AuthCtrRgstNumEqualSV"); //AuthCtrRgstNumEqualSV
			oAuthICAS.setLogPath(icasLogDir);

			// 3. 조회 조건 Object 생성
			// key하나에 여러개의 value가 들어올때는 '~'로 구성하여 보낸다.
			CommRecord oReqValue = new CommRecord();
			// 이번 개선으로 Input Parameter의 명칭이 모두 변경되었습니다.
			oReqValue.addValue("SVC_MGMT_NUM", svcNum);
			oReqValue.addValue("CTZ_CORP_NUM", ctz_corp_num);

//	        oReqValue.addValue("CTZ_CORP_NUM", ctz_corp_num);
//	        oReqValue.addValue("CTZ_CORP_NUM", "01046075496");
//	        oReqValue.addValue("SVC_NUM", "01067311472");
//	        oReqValue.addValue("SSN_BIRTH_DT", "830620");
//	        oReqValue.addValue("SSN_SEX_CD", "1");
//	        oReqValue.addValue("CUST_NM", "석국징");

			// 4. 조회 조건 Object 설정
			oAuthICAS.addParam(oReqValue);

			// 5. Method Call
			// log.info("IP : " + imsIP + "PORT : " + imsPort);
			int error = getCallRsltAuthICAS(oAuthICAS, imsIP, imsPort);

			//log.info("API<=>AIMS return : " + error);
			// 6. Object 초기화
			oAuthICAS.clear();

			// error = 0 : success (존재함)
			// error = x : 기타에러 (코드제공예정)

			//output 결과값
			//	3156 : REQUIRED_PARAMETER_IS_EMPTY(F)
			//	3401 : REQUIRED_PARAMETER_IS_INVALID(F)
			//	3101 : DB_NO_ROW_SELECTED (F)
			//	3151 : TOO_MANY_ROWS (F)
			// 	3436 : 명의자 주민번호 일치(Y)
			// 	3437 : 명의자 주민번호 불일치(N)
			//	3501 : conntecion 에러
			//	3502 : Parameter 에러
			//	4102 : INVALID_CUST_INFO

			if("3436".equals(error+EMPTY)){
				svcMgmtNumChk = "Y";
			}else{
				svcMgmtNumChk = "N";
			}

			svcMgmtNumChkMap.put("svcMgmtNumChk", svcMgmtNumChk);
			svcMgmtNumChkMap.put("cstCustNum", CST_CUST_NUM);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return svcMgmtNumChkMap;
	}

	/**
	 *
	 *
	 * @param svcNum
	 * @param birthday
	 * @param cust_nm
	 * @return
	 * @throws Exception String
	 */
	public static String getIcasInfo_dtl_birthday(String svcNum, String birthday, String cust_nm) throws Exception {
		String svc = EMPTY;

		try {
			// 1. AuthICAS Object 생성
			// CpId, CpPw16자리, CpKey32자리, CpKeyId, Timeout default 3초

			// 2016.11.09 ICAS Client 변경 적용
			//AuthICAS oAuthICAS = new AuthICAS("WPSM1222", "3c350fd1543f5de8", "b1aa654327a645e4a41243787c779e1d", "A");
			AuthICAS oAuthICAS = new AuthICAS(icasCpId, icasCpPwd, icasCpKey, "A");

			// CpId, CpPw
			// 2. Call할 Method 설정
			oAuthICAS.addMethod("AuthCtrRgstNumEqualSV"); //AuthCtrRgstNumEqualSV
			oAuthICAS.setLogPath(icasLogDir);

			// 3. 조회 조건 Object 생성
			// key하나에 여러개의 value가 들어올때는 '~'로 구성하여 보낸다.
			CommRecord oReqValue = new CommRecord();

			// 이번 개선으로 Input Parameter의 명칭이 모두 변경되었습니다.
			oReqValue.addValue("SVC_NUM", svcNum);
			oReqValue.addValue("SSN_BIRTH_DT", birthday.substring(0,6));
			oReqValue.addValue("SSN_SEX_CD", birthday.substring(6,7));
			oReqValue.addValue("CUST_NM", cust_nm);

			// 4. 조회 조건 Object 설정
			oAuthICAS.addParam(oReqValue);

			// 5. Method Call
			// log.info("IP : " + imsIP + "PORT : " + imsPort);
			int error = getCallRsltAuthICAS(oAuthICAS, imsIP, imsPort);

			//log.info("API<=>AIMS return : " + error);
			// 6. Object 초기화
			oAuthICAS.clear();

			// error = 0 : success (존재함)
			// error = x : 기타에러 (코드제공예정)

			//output 결과값
			//	3156 : REQUIRED_PARAMETER_IS_EMPTY(F)
			//	3401 : REQUIRED_PARAMETER_IS_INVALID(F)
			//	3101 : DB_NO_ROW_SELECTED (F)
			// 	3151 : TOO_MANY_ROWS (F)
			// 	3436 : 명의자 주민번호 일치(Y)
			// 	3437 : 명의자 주민번호 불일치(N)
			//	3501 : conntecion 에러
			//	3502 : Parameter 에러
			//	4102 : INVALID_CUST_INFO

			if("3436".equals(error+EMPTY)){
				svc = "Y";
			}else{
				svc = "N";
				System.out.println(error);
			}


		} catch (Exception e) {
			e.printStackTrace();
		}
		return svc;
	}

	/**
	 * 기기변경 ICas - 서비스관리번호로 고갱정보 조회 후 비교
	 * @param SvcMgmtNum
	 * @param cust_nm
	 * @param ctz_biz_num
	 * @return result
	 * @throws Exception
	 */
	public static Map<String,Object> getIcasInfo_userDtl(String SvcMgmtNum, String cust_nm, String ctz_biz_num) throws Exception {
		String SVC_MGMT_NUM = EMPTY;			 //서비스관리번호
		String CST_CUST_NM = EMPTY;			     //고객명
		String CST_SSN_BIRTH_DT = EMPTY;		 //주민번호 추출 생년월일
		String SVC_ST_CD = EMPTY;				     //서비스 상태코드
		String CST_CUST_NUM = EMPTY;			 //고객번호
		String EQP_MTHD_CD = EMPTY;			 //단말기 유형 구분

		String brith_dt = "";
		if(ctz_biz_num != null && ctz_biz_num.length() >=6 ) {
			brith_dt = ctz_biz_num.substring(0,6);	    //생년월일
		}
		String svcMgmtNumChk = "N";

		Map<String,Object> svcMgmtNumChkMap = new HashMap<String,Object>();

		try {

			//SystemConfig systemConfig = SystemConfig.getInstance();
			//String FILEDIR_ICASLOG_TGATE = systemConfig.propertiesGetConfig("FILEDIR_ICASLOG_TGATE");

			// 1. GetICAS Object 생성
			// CpId, CpPw16자리, CpKey32자리, CpKeyId, Timeout default 3초
			//GetICAS oGetICAS = new GetICAS("WPSM1222", "3c350fd1543f5de8", "b1aa654327a645e4a41243787c779e1d", "A");
			GetICAS oGetICAS = new GetICAS(icasCpId, icasCpPwd, icasCpKey, "A");

			// 1-1. 로그위치 설정
			//oGetICAS.setLogPath(FILEDIR_ICASLOG_TGATE);    // 미 작성시 오류코드 : 3505
			oGetICAS.setLogPath(icasLogDir);    // 미 작성시 오류코드 : 3505

			// 2. Call할 Method 설정
			oGetICAS.addMethod("GetCustomersSV");

			// 3. 조회 조건 Object 생성
			CommRecord oReqValue = new CommRecord();
			oReqValue.addValue("SVC_MGMT_NUM", SvcMgmtNum);

			// 4. 조회 조건 Object 설정
			oGetICAS.addParam(oReqValue);

			// 5. Method Call
			// log.info("IP : " + imsIP + "PORT : " + imsPort);
			int error = getCallRsltGetICAS(oGetICAS, imsIP, imsPort);

			if(error!=0) {
				log.error("서비스관리번호"+SvcMgmtNum+"API<=>AIMS return : " + error);
			}

			for(int i=0; oGetICAS.vcRetVal != null
					&& i < oGetICAS.vcRetVal.size(); i++) {
				CommRecord recordICAS = (CommRecord)oGetICAS.vcRetVal.get(i);

				log.debug("ZSVC_SVC_MGMT_NUM= " + recordICAS.getAttribute("ZSVC_SVC_MGMT_NUM"));

				SVC_MGMT_NUM = recordICAS.getAttribute("ZSVC_SVC_MGMT_NUM");	   //서비스관리번호
				CST_CUST_NM = recordICAS.getAttribute("ZCST_CUST_NM");			           //고객명
				CST_SSN_BIRTH_DT = recordICAS.getAttribute("ZCST_SSN_BIRTH_DT");	       //주민번호 추출 생년월일
				CST_CUST_NUM = recordICAS.getAttribute("ZCST_CUST_NUM");			       //고객번호
				SVC_ST_CD = recordICAS.getAttribute("SVC_ST_CD");	                           //서비스 상태코드
				EQP_MTHD_CD= recordICAS.getAttribute("EQP_MTHD_CD");	                      //단말기 방식 구분  D:2G, W:3G, L:Lte, F: 5G

			}

			// 6. Object 초기화
			oGetICAS.clear();

			log.info("### cust_nm : " +  cust_nm);
			log.info("### brith_dt : " +  brith_dt);
			log.info("### SVC_MGMT_NUM : " +  SVC_MGMT_NUM);
			log.info("### CST_CUST_NM : " +  CST_CUST_NM);
			log.info("### CST_SSN_BIRTH_DT : " +  CST_SSN_BIRTH_DT);
			log.info("### CST_CUST_NUM : " +  CST_CUST_NUM);		//고객번호
			log.info("### SVC_ST_CD : " +  SVC_ST_CD);				//상태코드
			log.info("### EQP_MTHD_CD : " +  EQP_MTHD_CD);


			//이름, 생년월일 비교
			if(cust_nm.equals(CST_CUST_NM) && brith_dt.equals(CST_SSN_BIRTH_DT)) {
				svcMgmtNumChk= "Y";
				log.info("### success ###");
			} else {
				log.info("### fail ###");
			}

			svcMgmtNumChkMap.put("svcMgmtNumChk", svcMgmtNumChk);
			svcMgmtNumChkMap.put("cstCustNum", CST_CUST_NUM);
			svcMgmtNumChkMap.put("eqpMthdCd", EQP_MTHD_CD);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return svcMgmtNumChkMap;
	}

	/**
	 * EQP_MTHD_CD(단말기 유형 구분) 조회
	 * @param SvcMgmtNum
	 * @return result
	 * @throws Exception
	 */
	public static String getEqpMethodCd(String SvcMgmtNum) throws Exception {
		String EQP_MTHD_CD = EMPTY;			 //단말기 유형 구분

		try {
			GetICAS oGetICAS = new GetICAS(icasCpId, icasCpPwd, icasCpKey, "A");
			oGetICAS.setLogPath(icasLogDir);
			oGetICAS.addMethod("GetCustomersSV");
			CommRecord oReqValue = new CommRecord();
			oReqValue.addValue("SVC_MGMT_NUM", SvcMgmtNum);
			oGetICAS.addParam(oReqValue);
			int error = getCallRsltGetICAS(oGetICAS, imsIP, imsPort);

			if(error!=0) {
				log.error("서비스관리번호"+SvcMgmtNum+"API<=>AIMS return : " + error);
			}

			for(int i=0; oGetICAS.vcRetVal != null  && i < oGetICAS.vcRetVal.size(); i++) {
				CommRecord recordICAS = (CommRecord)oGetICAS.vcRetVal.get(i);
				EQP_MTHD_CD = recordICAS.getAttribute("EQP_MTHD_CD");	                      //단말기 방식 구분  D:2G, W:3G, L:Lte, F: 5G
			}

			// 6. Object 초기화
			oGetICAS.clear();
			log.info("### EQP_MTHD_CD : " +  EQP_MTHD_CD);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return EQP_MTHD_CD;
	}

	/**
	 * 사용자 정보 조회
	 * @param SvcMgmtNum
	 * @param
	 * @param
	 * @return result
	 * @throws Exception
	 */
	public static Map<String,Object> getIcasInfo_userInfo(String SvcMgmtNum) throws Exception {
		String SVC_MGMT_NUM = EMPTY;			//서비스관리번호
		String CST_CUST_NM = EMPTY;			//고객명
		String CST_SSN_BIRTH_DT = EMPTY;		//주민번호 추출 생년월일
		String SVC_ST_CD = EMPTY;				//서비스 상태코드
		String CST_CUST_NUM = EMPTY;			//고객번호

		Map<String,Object> userInfoMap = new HashMap<String,Object>();

		try {
			//SystemConfig systemConfig = SystemConfig.getInstance();
			//String FILEDIR_ICASLOG_TGATE = systemConfig.propertiesGetConfig("FILEDIR_ICASLOG_TGATE");

			// 1. GetICAS Object 생성
			// CpId, CpPw16자리, CpKey32자리, CpKeyId, Timeout default 3초
			//GetICAS oGetICAS = new GetICAS("WPSM1222", "3c350fd1543f5de8", "b1aa654327a645e4a41243787c779e1d", "A");
			GetICAS oGetICAS = new GetICAS(icasCpId, icasCpPwd, icasCpKey, "A");

			// 1-1. 로그위치 설정
			//oGetICAS.setLogPath(FILEDIR_ICASLOG_TGATE);    // 미 작성시 오류코드 : 3505
			oGetICAS.setLogPath(icasLogDir);    // 미 작성시 오류코드 : 3505

			// 2. Call할 Method 설정
			oGetICAS.addMethod("GetCustomersSV");

			// 3. 조회 조건 Object 생성
			CommRecord oReqValue = new CommRecord();
			oReqValue.addValue("SVC_MGMT_NUM", SvcMgmtNum);

			// 4. 조회 조건 Object 설정
			oGetICAS.addParam(oReqValue);

			// 5. Method Call
			// log.info("IP : " + imsIP + "PORT : " + imsPort);
			int error = getCallRsltGetICAS(oGetICAS, imsIP, imsPort);

			if(error!=0) {
				log.error("서비스관리번호"+SvcMgmtNum+"API<=>AIMS return : " + error);
			}

			for(int i=0; oGetICAS.vcRetVal != null
					&& i < oGetICAS.vcRetVal.size(); i++) {
				CommRecord recordICAS = (CommRecord)oGetICAS.vcRetVal.get(i);

				SVC_MGMT_NUM = recordICAS.getAttribute("ZSVC_SVC_MGMT_NUM");		//서비스관리번호
				CST_CUST_NM = recordICAS.getAttribute("ZCST_CUST_NM");				//고객명
				CST_SSN_BIRTH_DT = recordICAS.getAttribute("ZCST_SSN_BIRTH_DT");	//주민번호 추출 생년월일
				CST_CUST_NUM = recordICAS.getAttribute("ZCST_CUST_NUM");			//고객번호
				SVC_ST_CD = recordICAS.getAttribute("SVC_ST_CD");					//서비스 상태코드
			}

			// 6. Object 초기화
			oGetICAS.clear();

			userInfoMap.put("SVC_MGMT_NUM", SVC_MGMT_NUM);
			userInfoMap.put("CST_CUST_NM", CST_CUST_NM);
			userInfoMap.put("CST_SSN_BIRTH_DT", CST_SSN_BIRTH_DT);
			userInfoMap.put("CST_CUST_NUM", CST_CUST_NUM);
			userInfoMap.put("SVC_ST_CD", SVC_ST_CD);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return userInfoMap;
	}

	/**
	 * <pre>
	 * 고객별 회선정보 조회
	 * <pre>
	 *
	 * @param sUser_id
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, String>> getMultiCircuit( String sUser_id ) throws Exception {
		// Return List
		List<Map<String, String>> rsltList = new ArrayList<Map<String, String>>();

		// -----------------------------------------------------------
		// LOG_NONE / LOG_TRACE / LOG_ASSERT / LOG_DEBUG
		// -----------------------------------------------------------
		CommDebug.setLevel( CommDebug.LOG_NONE );
		//SystemConfig systemConfig = SystemConfig.getInstance();
		//String FILEDIR_ICASLOG_TGATE = systemConfig.propertiesGetConfig("FILEDIR_ICASLOG_TGATE");

		// 1. GetICAS Object 생성
		// CpId, CpPw16자리, CpKey32자리, CpKeyId, Timeout default 3초
		//GetICAS oGetICAS = new GetICAS("WPSM1222", "3c350fd1543f5de8", "b1aa654327a645e4a41243787c779e1d", "A");
		GetICAS oGetICAS = new GetICAS(icasCpId, icasCpPwd, icasCpKey, "A");

		// 1-1. 로그위치 설정
		//oGetICAS.setLogPath(FILEDIR_ICASLOG_TGATE);    // 미 작성시 오류코드 : 3505
		oGetICAS.setLogPath(icasLogDir);    // 미 작성시 오류코드 : 3505

		// 2. Call할 Method 설정
		oGetICAS.addMethod( "GetMultiCircuitSV" );

		// 3. 조회 조건 Object 생성
		CommRecord rec = new CommRecord();
		rec.addValue( "USER_ID",( sUser_id ) );
		rec.addValue( "SMN_FLAG", "A" );

		// 4. 조회 조건 Object 설정
		oGetICAS.addParam( rec );

		// 5. Method Call
		int result = oGetICAS.call();

		if ( result == ICASConfig.SUCCESS ) {
			CommRecord rsltRec = null;
			Map<String, String> rsltMap =null;
			Iterator<CommRecord> iterator = oGetICAS.vcRetVal.iterator();
			while (iterator.hasNext()) {
				rsltRec = iterator.next();
				rsltMap = new HashMap<String, String>(); 											                // 재성성을 하여야 한다. for문 밖에서 한번 하면 마지막 데이터만 세팅된다.
				rsltMap.put( "svc_mgmt_num",rsltRec.getAttribute( "MSVC_SVC_MGMT_NUM" ));			// 서비스 관리 번호
				rsltMap.put( "customer_type", rsltRec.getAttribute( "ZCST_CUST_TYP_CD"));			        // 개인/법인 유형
				rsltMap.put( "cust_typ_cd", rsltRec.getAttribute( "ZCST_CUST_TYP_CD"));				        // 개인/법인 유형
				rsltMap.put( "svc_number", rsltRec.getAttribute( "SVC_NUM"));						            // service code
				rsltMap.put( "svc_typ_cd", rsltRec.getAttribute( "SVC_TYP_CD"));					                // 이용 종류(서비스타입코드)
				rsltMap.put( "equip_modl_cd", rsltRec.getAttribute( "EQP_MDL_CD"));					        // 단말기 모델코드
				rsltMap.put( "pric_plan_id", rsltRec.getAttribute( "FEE_PROD_ID"));					            // 요금제 계획 코드
				rsltMap.put( "svc_stat_cd", rsltRec.getAttribute( "SVC_ST_CD"));					               // 핸드폰 상태(AC=사용,SP=중지, HB=AC)
				rsltMap.put( "epwd_stat", rsltRec.getAttribute( "PWD_ST_CD"));						            // e-Station비밀번호 상태
				rsltMap.put( "cust_pwd_stat", rsltRec.getAttribute( "PWD_ST_CD"));					             // e-Station비밀번호 상태
				rsltMap.put( "cell_num_cd", rsltRec.getAttribute( "EQP_MTHD_CD"));					         // 2G/3G구분(W:3G,A,D:2G)
				rsltMap.put( "min_num", rsltRec.getAttribute( "MIN_NUM_N_WBR_IDX"));				        // min 번호 (mobile Identification Number)
				rsltMap.put( "Imsi_num", rsltRec.getAttribute( "IMSI_NUM"));						                  // imsi 번호 (international mobile station identity)
				rsltMap.put( "proj1_ind", rsltRec.getAttribute( "GRADE"));							               // 등급(A,Y,R,D)
				rsltMap.put( "grade", rsltRec.getAttribute( "GRADE"));								              // 등급(A,Y,R,D)
				rsltMap.put( "rgst_stat_cd", rsltRec.getAttribute( "IPIN_EQU_YN"));					            // 사용자 주민번호 인증
				rsltMap.put( "svc_cd", rsltRec.getAttribute( "SVC_CD"));							                     // 서비스구분코드
				rsltMap.put( "svc_ind", rsltRec.getAttribute( "SVC_DETAIL_CD"));					// 서비스식별(C:이동전화전용,D:겸용,P:DMB전용)
				rsltMap.put( "nick_nm", rsltRec.getAttribute( "NICK_NM"));							// 닉네임
				rsltMap.put( "rep_svc_seq", rsltRec.getAttribute( "REP_SVC_SEQ"));					// 다회선 회선 순위
				rsltMap.put( "cas_num", "" );														// CAS번호(겸용,DMB전용일때 값이 있음)
				rsltMap.put( "dmb_svc_mgmt_num", "" );												// DMB서비스관리번호
				rsltMap.put( "dmb_grade", "" );														// DMB등급
				rsltMap.put( "dmb_pric_plan_id", "" );												// DMB요금제코드
				rsltMap.put( "dmb_svc_stat_cd", "" );												// DMB핸드폰상태(AC=사용,SP=중지)
				rsltMap.put( "dmb_cust_pwd_stat", "" );												// DMB이스테이션비밀번호상태
				rsltMap.put( "cust_num", rsltRec.getAttribute( "ZCST_CUST_NUM" ));					//  고객번호
				rsltList.add(rsltMap);
			}
		}

		oGetICAS.clear();

		return rsltList;
	}


	/**
	 * <pre>
	 * ICAS로 [3.7. 고객번호 조회_비밀번호 입력(비밀번호 설정조회)] Data를 요청한다.
	 * </pre>
	 *
	 * @param
	 * @return String("서비스관리번호:비밀번호설정코드")
	 */
	public String getServiceSV(String svc_num) throws Exception {
		String resultTmp = "";
		//SystemConfig systemConfig = SystemConfig.getInstance();
		//String FILEDIR_ICASLOG_TGATE = systemConfig.propertiesGetConfig("FILEDIR_ICASLOG_TGATE");

		// 1. GetICAS Object 생성
		// CpId, CpPw16자리, CpKey32자리, CpKeyId, Timeout default 3초
		//GetICAS oGetICAS = new GetICAS("WPSM1222", "3c350fd1543f5de8", "b1aa654327a645e4a41243787c779e1d", "A");
		GetICAS oGetICAS = new GetICAS(icasCpId, icasCpPwd, icasCpKey, "A");

		// 1-1. 로그위치 설정
		//oGetICAS.setLogPath(FILEDIR_ICASLOG_TGATE);    // 미 작성시 오류코드 : 3505
		oGetICAS.setLogPath(icasLogDir);    // 미 작성시 오류코드 : 3505

		// 2. Call할 Method 설정
		oGetICAS.addMethod("GetServiceSV");

		// 3. 조회 조건 Object 생성
		CommRecord oReqValue = new CommRecord();
		oReqValue.addValue("SVC_NUM", svc_num);   // 이번 개선으로 Input Parameter의 명칭이 모두 변경되었습니다.
		oReqValue.addValue("SMN_FLAG", "C");

		// 4. 조회 조건 Object 설정
		oGetICAS.addParam(oReqValue);

		// 5. Method Call
		int error = oGetICAS.call();
		log.debug("API<=>AIMS return : " + error);

		CommRecord resultICAS = new CommRecord();
		if(oGetICAS.vcRetVal.size() > 0){
			resultICAS = (CommRecord)oGetICAS.vcRetVal.get(0);
		}

		log.debug("ZSVC_SVC_MGMT_NUM     	::[" + resultICAS.getAttribute("ZSVC_SVC_MGMT_NUM") + "]");
		log.debug("PWD_ST_CD             	::[" + resultICAS.getAttribute("PWD_ST_CD") + "]");
		/*20, 21, 30: 비밀번호 체크해야함 70: 잠김(대리점에서 확인 후 사용해야함)*/
		String tmpStr = resultICAS.getAttribute("PWD_ST_CD");

		if("".equals(tmpStr)|| tmpStr == null ) tmpStr = "09";        /*서비스관리번호만 나오는 고객은 09처리*/
		resultTmp = resultICAS.getAttribute("ZSVC_SVC_MGMT_NUM") + ":" + tmpStr;

		// 6. Object 초기화
		oGetICAS.clear();

		return resultTmp;
	}



	/**
	 * <pre>
	 * ICAS로 [3.7. 고객번호 조회_비밀번호 입력(비밀번호인증)] Data를 요청한다.
	 * </pre>
	 *
	 * @param
	 * @return String("서비스관리번호:비밀번호설정코드")
	 */
	public int authEstPwdSV(String svc_mgmt_num, String pwd) {

		// 1. GetICAS Object 생성
		// CpId, CpPw16자리, CpKey32자리, CpKeyId, Timeout default 3초
		//AuthICAS oAuthICAS = new AuthICAS("WPSM1222", "3c350fd1543f5de8", "b1aa654327a645e4a41243787c779e1d", "A");
		AuthICAS oAuthICAS = new AuthICAS(icasCpId, icasCpPwd, icasCpKey, "A");

		// 2. Call할 Method 설정
		oAuthICAS.addMethod("AuthEstPwdSV");
		oAuthICAS.setLogPath(icasLogDir);

		// 3. 조회 조건 Object 생성
		CommRecord oReqValue = new CommRecord();
		oReqValue.addValue("SVC_MGMT_NUM", svc_mgmt_num);         // 이번 개선으로 Input Parameter의 명칭이 모두 변경되었습니다.

		try {
			pwd = CipherSHA256.encrypt(pwd);
		} catch(Exception e) {}

		oReqValue.addValue("PWD", pwd);

		// 4. 조회 조건 Object 설정
		oAuthICAS.addParam(oReqValue);

		// 5. Method Call
		int error = oAuthICAS.call();
		log.debug("API<=>AIMS return : " + error);

		// 6. Object 초기화
		oAuthICAS.clear();

		return error;
	}

	/**
	 * <pre>
	 * 고객번호 조회
	 * <pre>
	 *
	 * @param svcNum
	 * @return
	 * @throws Exception String
	 */
	public static String getIcasInfoCustNum(String svcNum) throws Exception {
		String CUSTNUM=EMPTY;

		try {
			//SystemConfig systemConfig = SystemConfig.getInstance();
			//String FILEDIR_ICASLOG_TGATE = systemConfig.propertiesGetConfig("FILEDIR_ICASLOG_TGATE");

			if(svcNum!=null && !svcNum.trim().equals("")) {
				if(svcNum.length()==10 || svcNum.length()==11) {
					svcNum = setSvcNumMidZero(svcNum);

					// 1. GetICAS Object 생성
					// CpId, CpPw16자리, CpKey32자리, CpKeyId, Timeout default 3초
					//GetICAS oGetICAS = new GetICAS("WPSM1222", "3c350fd1543f5de8", "b1aa654327a645e4a41243787c779e1d", "A");
					GetICAS oGetICAS = new GetICAS(icasCpId, icasCpPwd, icasCpKey, "A");

					// 1-1. 로그위치 설정
					//oGetICAS.setLogPath(FILEDIR_ICASLOG_TGATE);    // 미 작성시 오류코드 : 3505
					oGetICAS.setLogPath(icasLogDir);    // 미 작성시 오류코드 : 3505

					// 2. Call할 Method 설정
					oGetICAS.addMethod("GetCustomersSV");

					// 3. 조회 조건 Object 생성
					CommRecord oReqValue = new CommRecord();
					oReqValue.addValue("SVC_NUM", svcNum);

					// 4. 조회 조건 Object 설정
					oGetICAS.addParam(oReqValue);

					// 5. Method Call
					// log.info("IP : " + imsIP + "PORT : " + imsPort);
					int error = getCallRsltGetICAS(oGetICAS, imsIP, imsPort);

					if(error!=0) {
						log.error("서비스번호"+svcNum+"API<=>AIMS return : " + error);
					}

					for(int i=0; oGetICAS.vcRetVal != null
							&& i < oGetICAS.vcRetVal.size(); i++) {
						CommRecord recordICAS = (CommRecord)oGetICAS.vcRetVal.get(i);

						log.debug("ZCST_CUST_NUM= " + recordICAS.getAttribute("ZCST_CUST_NUM"));

						CUSTNUM = (String)recordICAS.getAttribute("ZCST_CUST_NUM");
					}

					// 6. Object 초기화
					oGetICAS.clear();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return CUSTNUM;
	}

	/**
	 * 서비스번호(전화번호) 중간자리를 4자리로 맞추어주기위해 앞자리를 0으로 채움
	 *
	 * @param svcNum
	 * @return String
	 */
	private static String setSvcNumMidZero(String svcNum) {
		if(svcNum.length()==10) {
			String pre = svcNum.substring(0, 3);
			String num = svcNum.substring(3, 10);
			svcNum = pre + "0"+ num;
		}
		return svcNum;
	}

	/**
	 * GetICAS 호출
	 *
	 * @param oGetICAS
	 * @param ip
	 * @param port
	 * @return int
	 */
	private static int getCallRsltGetICAS(GetICAS oGetICAS, String ip, int port) {
		int rsltCd = 0;

		if( ip != null && !EMPTY.equals(ip)) {
			if( port > 0) {
				rsltCd = oGetICAS.call(ip, port);
			}else{
				rsltCd = oGetICAS.call(ip);
			}
		}else{
			rsltCd = oGetICAS.call();
		}
		return rsltCd;
	}

	/**
	 * AuthICAS 호출
	 *
	 * @param authICAS
	 * @param ip
	 * @param port
	 * @return int
	 */
	private static int getCallRsltAuthICAS(AuthICAS authICAS, String ip, int port) {
		int rsltCd = 0;

		if( ip != null && !EMPTY.equals(ip)) {
			if( port > 0) {
				rsltCd = authICAS.call(ip, port);
			}else{
				rsltCd = authICAS.call(ip);
			}
		}else{
			rsltCd = authICAS.call();
		}
		return rsltCd;
	}
	/**
	 * 2017.02.10
	 * getCustTypeCd 공통
	 * @param b2b_online_cl
	 * @param comm_auth_cl   실명인증 구분  01:개인, 02:법인(B2C), 03:법인(B2B) , 04:청소년, 05:외국인(외국인번호), 06:외국인(여권번호), 07:특수개인
	 * @return CUST_TYP_CD   cust_typ_cd 01 : 개인, 02:법인, 03:공공기관/단체
	 */
	public static String getCustTypeCd(String b2b_online_cl, String comm_auth_cl){
		String CUST_TYP_CD = "";

		log.info("b2b_online_cl : " + b2b_online_cl +"  // comm_auth_cl :" +  comm_auth_cl );

		if (b2b_online_cl.equals("C00")) {//가입 구분: 온라인 일반이면..

			if (comm_auth_cl.equals("01") || comm_auth_cl.equals("04")|| comm_auth_cl.equals("05")|| comm_auth_cl.equals("06")) {
				CUST_TYP_CD = "01";
			} else if (comm_auth_cl.equals("02")) { //법인
				CUST_TYP_CD = "02";
			} else if (comm_auth_cl.equals("03")) { //공공기관
				CUST_TYP_CD = "03";
			}
		} else if(b2b_online_cl.equals("BK2") || b2b_online_cl.equals("BL2") || b2b_online_cl.equals("BM2")|| b2b_online_cl.equals("B02")|| b2b_online_cl.equals("BP2")) {//가입 구분: 특수개인이면..
			CUST_TYP_CD = "01";
		} else if(b2b_online_cl.equals("BG1")) {//가입 구분: 공공기관이면..
			CUST_TYP_CD = "03";
		} else if(b2b_online_cl.equals("BK1") || b2b_online_cl.equals("BL1")|| b2b_online_cl.equals("BM1")|| b2b_online_cl.equals("B01")|| b2b_online_cl.equals("BP1")) {//가입 구분: 특수기관이면..
			CUST_TYP_CD = "03";
		} else if(b2b_online_cl.equals("B04")) {//가입 구분: B2B일반법인이면..
			CUST_TYP_CD = "02";
		}

		log.info("b2b_online_cl : " + b2b_online_cl +" //comm_auth_cl :" +  comm_auth_cl+"//CUST_TYP_CD :" +CUST_TYP_CD );
		return CUST_TYP_CD;
	}

	/**
	 * 테스트
	 * @param args
	 * @throws Exception
	 */
	public static void main(String[] args)throws Exception{
		SvcMgmtUtil a = new SvcMgmtUtil();

		log.info("서비스관리번호 : " + a.getIcasInfo("01038603256"));

		//017-390-0877
		//		01038603256
		//log.info("서비스관리번호 : " + a.getIcasInfo("01047083256 "));
		//log.info("서비스관리번호 : " + "["+a.getIcasEqpCd("01199449270")+ "]");

		//  010-5240-9066 // 1670071705
		//
		//
		//		log.info(a.getIcasInfo_dtl("1670071705", "4709101"));
//     		System.out.println(a.getIcasInfo_userDtl(a.getIcasInfo("01102011086"), "대명교통", "1701110010637"));

//    		System.out.println(a.getServiceSV("01038603256"));
//    		System.out.println(a.getServiceSV(a.getServiceSV("01092063766")));

		//		System.out.println(a.getIcasInfo_dtl(a.getIcasInfo("01088470774"), "8608271350813"));
		//		System.out.println(a.getIcasInfo_dtl_birthday("01067311472", "8306201041510","김용일"));
		//		System.out.println(a.getIcasInfo_dtl_birthday("01052730678", "4709101","정성규"));
	}
}