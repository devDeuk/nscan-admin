package com.sktel.nscan.common.utils;

import lombok.extern.slf4j.Slf4j;

import java.util.Random;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

@Slf4j
public class CipherAES128 {


	 private static String COMMON_SECURE_AESKEY_128="TGATEBGATETRGATE";
	    /** 
	     * 입력받은 수 만큼 렌덤 문자를 만들어 반환한다. 
	     * 난수를 발생시켜 이에 대응하는 알파뱃 문자를 생성한다.
	     * 생성된 알파뱃을 연결해 하나의 랜덤 문자를 만든다. 
	     * @return 
	     * */
	    public static String getRandomText(){
	     
	       int textSize = 16;
	       int rmSeed = 9;
	       String rmText = "";
	       Random random = new Random(System.currentTimeMillis());
	       int rmNum = 0;
	       char ch = 'a';
	       
	       for (int i = 0; i < textSize; i++) {
	        random.setSeed(System.currentTimeMillis() * rmSeed * i + rmSeed + i);
	        rmNum = random.nextInt(25);
	        ch += rmNum;
	        rmText = rmText + ch ;
	        ch = 'a';
	       }  
	       
	       return rmText;
	    }
	    /**
	     * hex to byte[] : 16진수 문자열을 바이트 배열로 변환한다.
	     * 
	     * @param hex    hex string
	     * @return
	     */
	    public static byte[] hexToByteArray(String hex) {
	        if (hex == null || hex.length() == 0) {
	            return null;
	        }
	        byte[] ba = new byte[hex.length() / 2];
	        for (int i = 0; i < ba.length; i++) {
	            ba[i] = (byte) Integer.parseInt(hex.substring(2 * i, 2 * i + 2), 16);
	        }
	        return ba;
	    }
	    /**
	     * byte[] to hex : unsigned byte(바이트) 배열을 16진수 문자열로 바꾼다.
	     * 
	     * @param ba        byte[]
	     * @return
	     */
	    public static String byteArrayToHex(byte[] ba) {
	        if (ba == null || ba.length == 0) {
	            return null;
	        }
	        StringBuffer sb = new StringBuffer(ba.length * 2);
	        String hexNumber;
	        for (int x = 0; x < ba.length; x++) {
	            hexNumber = "0" + Integer.toHexString(0xff & ba[x]);
	            sb.append(hexNumber.substring(hexNumber.length() - 2));
	        }
	        return sb.toString();
	    } 
	    
	    /**
	     * AES 방식의 암호화, 시스템공통 key 사용
	     * 
	     * @param message
	     * @return
	     * @throws Exception
	     */
	    public static String encrypt(String message) throws Exception {
	    	try {
	    		if(message == null ){ return message;}
	    		if("".equals(message)){ return message;}
	    	}catch (Exception e) {
	    		e.printStackTrace();
			}	    	
	     return encrypt(COMMON_SECURE_AESKEY_128,message);
	    }
	    
	    /**
	     * AES 방식의 복호화, 시스템공통 key 사용
	     * 
	     * @param
	     * @return
	     * @throws Exception
	     */
	    public static String decrypt(String encrypted) throws Exception {
	    	try {
	    		if(encrypted == null ){ return encrypted;}
	    		if("".equals(encrypted)){ return encrypted;}
	    	}catch (Exception e) {
	    		e.printStackTrace();
			}
	    	return decrypt(COMMON_SECURE_AESKEY_128,encrypted);
	    }
	    
	    /**
	     * AES 방식의 암호화
	     * 
	     * @param message
	     * @return
	     * @throws Exception
	     */
	    public static String encrypt(String key, String message) throws Exception {
	        SecretKeySpec skeySpec = new SecretKeySpec(key.getBytes(), "AES");
	        // Instantiate the cipher
	        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5PADDING");
	        cipher.init(Cipher.ENCRYPT_MODE, skeySpec);
	        byte[] encrypted = cipher.doFinal(message.getBytes());
	        return byteArrayToHex(encrypted);
	    }
	    /**
	     * AES 방식의 복호화
	     * 
	     * @param
	     * @return
	     * @throws Exception
	     */
	    public static String decrypt(String key, String encrypted) throws Exception {
	        SecretKeySpec skeySpec = new SecretKeySpec(key.getBytes(), "AES");
	        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5PADDING");
	        cipher.init(Cipher.DECRYPT_MODE, skeySpec);
	        byte[] original = cipher.doFinal(hexToByteArray(encrypted));
	        String originalString = new String(original);
	        return originalString;
	    }
	    
	    public static void main(String[] args) throws Exception {
	     
			 //128bit key 지정
			 String key = "1234567890123456";

		   // 해당key로 암호화 
		  String enc = CipherAES128.encrypt(key, "some text");
		  System.out.println("enc text: "+enc);
		  
		  // 해당key로 복호화 
		  String dec = CipherAES128.decrypt("f43f2d5c461899249a866910f8c62652");
		  System.out.println("dec text: "+dec);
		  
		  System.out.println("some text: "+CipherAES128.encrypt("some text"));
		  System.out.println("some text: "+CipherAES128.decrypt(CipherAES128.encrypt("some text")));

		  String abb= "a304d49b9f8566593d24f438b6e13796e8c72039";
		  
		  System.out.println("some texttt: "+CipherAES128.decrypt("f43f2d5c461899249a866910f8c62652"));
		  
		  
		  
		  
		  
		  System.out.println("###############################################################################");
	    }
	    
	 public static String getCommonKey() {
	  return COMMON_SECURE_AESKEY_128;
	 }
	
}
