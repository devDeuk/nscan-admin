package com.sktel.nscan.common.utils;


import com.eai.mq.api.EaiApiData;
import com.eai.mq.api.EaiMQApi;
import com.eai.mq.conf.EaiException;
import lombok.extern.slf4j.Slf4j;


@Slf4j
public class SmsSender extends Thread{
	

	
	/*
	 * MMS 발송 전문 데이터
	 */
	String in_rsvNO; 	// 수신전화번호
	String MSG_SER_NUM; // 메시지일련번호
	String in_sendNo; 	// 발신(회신)전화번호
	String in_content; 	// SMS 내용
	String in_subject; 	// SMS 제목
	
	/**
	 * Sms 발송하는 메소드
	 * @param rsvNO			수신번호
	 * @param MSG_SER_NUM	사용자아이디(SEQ_NUM 신청서 번호)
	 * @param sendNo		발신번호
	 * @param content		MMS 메시지
	 * @param subject		MMS 제목
	 * @throws Exception 
	*/
	
	public SmsSender(String rsvNO, String MSG_SER_NUM,String sendNo, String content, String subject ) throws Exception {
				
		String today  = DateUtil.getCurrentTime();
		String todayTimesec2  = StringUtil.todayTimesec2();
		log.info("today : " + todayTimesec2);

		MSG_SER_NUM = StringUtil.randomNum()+ today + StringUtil.randomNum();

		log.info("MSG_SER_NUM : " + MSG_SER_NUM);
		log.info("MSG_SER_NUMlength() : " + MSG_SER_NUM.length());
		log.info("sendNo : " + sendNo);
		log.info("content : " + content);
		log.info("subject : " + subject);

		this.MSG_SER_NUM	= MSG_SER_NUM;
		this.in_subject 	= subject;
		this.in_content		= content;
		this.in_sendNo		= sendNo;
		this.in_rsvNO		= rsvNO;
	}
	
	public static String rpad(String str, char pad, int length){
		
		String tmpStr;
		if(str == null){
			tmpStr = "";
		}else{
			tmpStr=str;
		}
		
		byte[] b = tmpStr.getBytes();
		
		if(b.length == length){
			return tmpStr;
		}else if(b.length > length){
			return new String(b,0,length);
		}else{
			String padString = Character.toString(pad);
			StringBuffer result = new StringBuffer(new String(b));
			
			int padCount = length - b.length;
			
			for(int i=0; i<padCount;i++){
				result.append(padString);
			}
			return result.toString();
		}
	}
	public static boolean allDigitNumCheck(String msg){
		
		int length = msg.length();
		boolean result = true;
		for(int i=0; i < length; i++){
			if(isNum(msg.charAt(i) ) ){
				//숫자가 아닌 경우만 else에서 false 체크
			}else{
				result = false;
			}
		}
		return result;
	}
	
	public static boolean isNum(char digit){
		if(digit == '0' || digit == '1' ||digit == '2' ||digit == '3' ||digit == '4' ||digit == '5' ||digit == '6' ||digit == '7' ||digit == '8' ||digit == '9'){
			return true;
		}else{
			return false;
		}	
	}
	
	public synchronized void run() {
		
		/***********************************
		 * EAI 연동
		 ***********************************/			
		EaiMQApi mqapi = new EaiMQApi();
		
		try{
						
			/***********************************
			 * 시간 설정
			 ***********************************/			
			String cre_dt = DateUtil.getCurrentTime();	//dao.getCreDate();
			String sta_dt = "";	//dao.getEachStaDate();
			String end_dt = "";	//dao.getEachEndDate();
			
			log.info("cre_dt : " + cre_dt);
			
			
			/**********************************
			 * eai Connection 확인
			 **********************************/
			int ret = -1; 			//연결여부 확인
		    int sleep_time = 1000;  //1000 milli-Second = 1Second
		    
			try {
				log.info("******************************************************");
				log.info("* EAI 연동 Connection");
				log.info("******************************************************");
				ret = mqapi.mq_connect();
				
				log.info("ret : " +  ret);
			} catch (EaiException e) {
				log.error("mq_connect is failed => CODE : " + e.getErrcode() + ", MSG : " + e.getMessage());
			}

			if (ret == 0) {
				
					EaiApiData ApiData = new EaiApiData() ;
					ApiData.initPut() ;
					
					ApiData.m_mqput_t.in_intf_msg_id = "in_intf_msg_id" ;
					ApiData.m_mqput_t.in_intf_id = "TGT.SMS_SND_MFF" ;
					ApiData.m_mqput_t.in_intf_op_code = "in_intf_op_code" ;
					
					/************************************************
					//icas 서비스 관리번호 여부 확인
					//수신번호 skt여부확인 
					************************************************/
					log.info("in_rsvNO : " + in_rsvNO);
					
					if(in_rsvNO.length()==10 || in_rsvNO.length()==11) {
						if(in_rsvNO.length()==10) {
							String pre = in_rsvNO.substring(0, 3);
							String num = in_rsvNO.substring(3, 10);
							in_rsvNO = pre + "0"+ num;
						}
					}
					log.info("in_rsvNO 자리수 변환 : " + in_rsvNO);
						
					String svc_num = SvcMgmtUtil.getIcasInfo(in_rsvNO);	
					String sktMemberYn = "N";
					if(!"".equals(svc_num)){
						sktMemberYn = "Y";
					}
					log.info("svc_num : " + svc_num);
					log.info("sktMemberYn : " + sktMemberYn);
					
					
					//SMS 개별 발송 전문 구성
					String sendbuf = "0100"								//MSG_CD[4] 			1. 메시지코드(4)(필수)
								   + "S"								//SMS_OP_CL_CD[1] 		2. SMS처리구분코드(1)(필수)
								   + rpad("TGT.SMS_SND_MFF", ' ', 50)	//INTF_ID[50]			3. 인터페이스ID(50)(응답여부 field가 'Y'일 경우 인터페이스ID 필수)
								   + rpad("ZTGTBTRG0000", ' ', 20)		//PGM_ID[20] 			4. 프로그램ID(20)(필수)
								   + rpad(MSG_SER_NUM, ' ', 15)			//MSG_SER_NUM[15] 		5. 메시지일련번호(15)(필수)						 \
								   + rpad("", ' ', 20)					//UKEY_ID1[20] 			6. UKEY ID(캠페인ID)(20) 
								   + rpad("", ' ', 20)					//UKEY_ID2[20] 			7. UKEY ID(캠페인ID)(20)
								   + rpad("", ' ', 20)					//UKEY_ID3[20] 			8. UKEY ID(캠페인ID)(20)
								   + rpad("", ' ', 5) 					//TID[5] 				9. Teleservice ID (5)
								   + rpad("", ' ', 7) 					//N/A[7]				10. 사용안함 (7)
								   + rpad(in_sendNo, ' ', 12)			//RPLY_PHON_NUM[12]		11.	회신번호(12)
								   + rpad("", ' ', 80)					//RPLY_URL[80]			12. 회신 URL (80)
								   + rpad(cre_dt, ' ', 14)				//CRE_DT_HMS[14] 		13. 생성일시  (14) (필수)
								   + rpad(sta_dt, ' ', 14)				//TRMS_STA_DT_HMS[14]	14. 발송시작일시  (14)
								   + rpad(end_dt, ' ', 14)				//TRMS_END_DT_HMS[14]	15. 발송종료일시  (14)
								   + rpad("", ' ', 9)					//TRMS_PSBL_TM_PRD1[9] 	16. 전송가능시간대1(9)
								   + rpad("", ' ', 9)					//TRMS_PSBL_TM_PRD2[9]	17. 전송가능시간대2(9)
								   + "1"								//EMCY_TRMS_YN[1]		18. 착신전환여부 (1)
								   + rpad("", ' ', 5)					//TRMS_CYCL[5] 			19. 전송주기 (5)
								   + rpad("10", ' ', 3)					//TIMEOUT_TM[3]			20. 타임아웃시간 (3)	(필수)
								   + "N"								//RSP_YN[1]				21. 응답여부 (1)	(필수)
								   + rpad("1", ' ', 1)					//LONG_SMS_OP_TYP[1]	22. 장문처리유형 (1) (필수)
								   + rpad("", ' ', 9)					//TMPLT_ID[9]			23. 템플릿ID (9)
								   + rpad("", ' ', 80)					//TMPLT_MSG[80]			24. 템플릿MSG (80)
								   + rpad(in_content,' ', 2000)			//SMS_PHRS[2000]		25. SMS내용 (2000)
								   + rpad(in_rsvNO, ' ', 12)			//RCV_PHON_NUM[12] 		26. 수신전화번호 (12) (필수) 3+4+4 양식으로 맞춰야함
								   + rpad("", ' ', 10)					//SVC_MGMT_NUM[10]		27. 서비스관리번호 (10)
								   + rpad(sktMemberYn, ' ', 1)			//SKT_CUST_Y[1]			28. SKT 고객 여부 (1) (필수)
								   + rpad("", ' ', 99*23);              //body 전문에 의해서 나머지 99*23개의 공백 문자열을 추가한다.
								   ;
								   
					log.info("[" + sendbuf + "]");
					log.info("[" + sendbuf.getBytes().length + "]");
					
					ApiData.m_mqput_t.in_send_buf = sendbuf ;
					ApiData.m_mqput_t.in_send_buf_len = sendbuf.length() ;
					
					if ((ret=mqapi.mq_put(ApiData)) != 0) {
						throw new Exception("mqapi.mq_puts error") ;
					}
					
				
					if ((ret=mqapi.mq_disconnect()) != 0) {
						throw new Exception("mqapi.mq_disconn error") ;
					}				
			}else{	
				
	            if (ret == -2)
	            {
	                System.out.println("No Data Found...!!!" );  
	                Thread.sleep(sleep_time);
	            }

	            if (ret == 30)
	            {
	                System.out.println("Connection Broken...!!!" );
	                throw new Exception("mqapi.mq_get connection error") ;
	            }				
	            
				throw new Exception("mqapi.mq_connect") ;
			}
		}
		catch(Exception e) {
			System.out.println("[SmsSender] MQ Exception");
			e.printStackTrace();
		}finally{
			log.info("MQ finally disconnect");
			mqapi.mq_disconnect();
		}
		
		log.info("전송완료");
		
	}
	
	
	public static void main(String[] args)throws Exception{
		
		SmsSender send = new SmsSender("01038603256", "SOCP", "114", "content", "title");
		send.start();

	}	
}
