package com.sktel.nscan.common.utils;

import lombok.extern.slf4j.Slf4j;

import java.security.MessageDigest;


/********************************************************************************
* <PRE> * 프로그램 정보 *
* 1. Project	: JHelper
* 2. Package	: com.common.util
* 3. FileName	: CipherSHA256.java
* 4. 작성자	: D e u k
* 5. 작성일	: 2013. 9. 24. 오후 9:20:23
* 6. 설명	:
* </PRE>
********************************************************************************/

@Slf4j
public class CipherSHA256 {


   /**
    * SHA256 단방향 암호화
    *
    * @param message
    * @return
    * @throws Exception
    */
   public static String encrypt(String message) throws Exception {
       String SHA ="";

       String input = StringUtil.strNull(message);

       if("".equals(input)){
           return input;
       }


       MessageDigest sh= MessageDigest.getInstance("SHA-256");
       sh.update(message.getBytes());
       byte byteData[] = sh.digest();
       StringBuffer sb = new StringBuffer();

       for(int i = 0; i < byteData.length ; i++){
           sb.append(Integer.toString((byteData[i]&0xff) + 0x100, 16).substring(1));
       }
       SHA = sb.toString();

       return SHA;
   }


   /**********************************************************************
    * <PRE> * 메소드 정보 *
    * 1. MethodName	: main
    * 2. ClassName	: CipherSHA256
    * 3. 작성자	: D e u k
    * 4. 작성일	: 2013. 9. 24. 오후 9:20:23
    * 5. 설명	:
    * </PRE>
    * 		@return void
    * 		@param args
    **********************************************************************/
   public static void main(String[] args) {
       // TODO Auto-generated method stub
       String str = "가나다라마바사";
       String eStr = "alkdjfalksjdelkjf";
       String eStrNum = "tkfkd1sdlkfjsldkfjlskdjflksjdflksjdf";
       String e1StrNum = "TKFKD1SDLKFJSLDKFJLSKDJFLKSJDFLKSJDF";
       try{
           /*
           System.out.println(CipherSHA256.encrypt(str));
           System.out.println(CipherSHA256.encrypt(eStr));
           System.out.println(CipherSHA256.encrypt(eStrNum));
           System.out.println(CipherSHA256.encrypt(e1StrNum));
           */


           System.out.println(CipherSHA256.encrypt("deug1234"));
           System.out.println(CipherSHA256.encrypt("yangyanga"));
           System.out.println(CipherSHA256.encrypt("whowho12"));


       }catch(Exception e){
           e.printStackTrace();
       }
   }

}
