package com.sktel.nscan.common.utils;

import com.skt.ejb.EjbManager;
import com.skt.ejb.SMSSendRemote;
import lombok.extern.slf4j.Slf4j;


@Slf4j
public class SmsUtil {
	


	public SmsUtil() {
	}
	
	/**
	 * Sms 발송하는 메소드
	 * @param sCallNum		수신번호
	 * @param sUserID		사용자아이디(SEQ_NUM 신청서 번호)
	 * @param sSenderNum	발신번호
	 * @param sCallMsg		SMS 메시지
	 * @return
	 * @throws Exception
	 */
	public static String sendSms(String sCallNum, String sUserID, String sSenderNum, String sCallMsg) throws Exception {
		String resultMsg="";
		
		try {
			//**성능테스트1**// 
			if(StringUtil.loopback || StringUtil.smsLoopback){ 
				log.info("StringUtil.loopback : " + StringUtil.loopback);
				log.info("StringUtil.smsLoopback : " + StringUtil.smsLoopback);
				return "패스";
				}
			//**성능테스트1**// 
			
/* UKEY SMS로 변경			
    		//String sCode = "CMN_PLT_IFM_SMS"; // 업무코드
			// 2011.04.14 업무코드변경/
			String sCode = "FWD_TGT_JOINIFM_INFO"; // 업무코드
			
//    		SMSSendRemote reqRemote = (SMSSendRemote)EjbManager.getInstance().ejbConnect(EjbManager.TEST_PROVIDER_URL);
    		SMSSendRemote reqRemote = (SMSSendRemote)EjbManager.getInstance().ejbConnect(EjbManager.REAL_PROVIDER_URL);
    
    		log.info("기존 문구: "+sCallMsg);
    		String strSmsCut = StringUtil.strSmsCut(sCallMsg, 79);
    		log.info("변경 문구: "+strSmsCut);
    		
    		String resultCode = reqRemote.sendSmsSynch(sCode,sUserID,sCallNum,sSenderNum,strSmsCut);
    		log.info("resultCode:"+resultCode);
    		resultMsg = reqRemote.getMessage(resultCode);
    		log.info("resultMsg:"+resultMsg);
*/			
			String strSmsCut = StringUtil.strSmsCut(sCallMsg, 79);
			
			SmsSender send = new SmsSender(sCallNum, sUserID, sSenderNum, strSmsCut, "");
			send.start();
    		
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultMsg;
   }
	
	
	
	/**
	 * Sms 운영자 발송하는 메소드
	 * @param sCallMsg		SMS 메시지
	 * @return
	 * @throws Exception
	 */
	public static String tgate_SM_sendSms(String sCallMsg) throws Exception {
		String resultMsg="";
		
		try {
			//**성능테스트2**// 
			if(StringUtil.loopback || StringUtil.smsLoopback) { return "패스";}
			//**성능테스트2**//
			
			String currentTime = DateUtil.getCurrentTime().toString();
			String user = "";
			String call = "";
	       	for(int i=1; i<6; i++){
	       		if (i == 1){
        			call = "01090815181";	//심진영 G
        			user = currentTime+"A";
        		} else if (i == 2) {
        			call = "01085214786";	//김상덕 D
        			user = currentTime+"B";
        		} else if (i == 3){
        			call = "01036008579";	//진경원 D
        			user = currentTime+"C";
        		} else if (i == 4) {
        			call = "01052022722";	//이호한 D
        			user = currentTime+"D";	        			
        		} else if (i == 5) {
        			call = "01038603256";	//김성득 D
        			user = currentTime+"E";	        			
        		} else if (i == 6) {
        			call = "01067311472";	//김용일 D
        			user = currentTime+"F";	        			
        		}		
	
	    		//String sCode = "CMN_PLT_IFM_SMS"; // 업무코드
				/**
				 * 2011.04.14 업무코드변경
				 * */
				String sCode = "FWD_TGT_JOINIFM_INFO"; // 업무코드
				
	//    		SMSSendRemote reqRemote = (SMSSendRemote)EjbManager.getInstance().ejbConnect(EjbManager.TEST_PROVIDER_URL);
	    		SMSSendRemote reqRemote = (SMSSendRemote)EjbManager.getInstance().ejbConnect(EjbManager.REAL_PROVIDER_URL);
	    
	    		
	    		String strSmsCut = StringUtil.strSmsCut(sCallMsg, 79);
	    		
	    		String sCallNum = call;
	    		String sUserID = user;
	    		String sSenderNum = "0264002885"; // 발신번호 - 판매자 전화번호
	    		
	    		String resultCode = reqRemote.sendSmsSynch(sCode,user,sCallNum,sSenderNum,strSmsCut);
	    		resultMsg = reqRemote.getMessage(resultCode);
	        	}
    		
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultMsg;
   }	
	
	
}