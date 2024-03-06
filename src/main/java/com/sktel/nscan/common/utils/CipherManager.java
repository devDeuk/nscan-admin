package com.sktel.nscan.common.utils;

import lombok.extern.slf4j.Slf4j;

import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

@Slf4j
public class CipherManager {
	private static String mKey = "VQa16HJcwo6nC2UN7TnBqr2EbxzF7bkb";
	private static String transformationRule = "AES/CBC/PKCS5Padding";
	private static String IV = "dfj4bJ1x6Q5m3m8w";

	public static CipherManager instance;

	public static CipherManager getInstance() {
		if (instance == null) {
			instance = new CipherManager();
		}
		return instance;
	}

	public String aescDecrypt(String str) throws Exception {
	
		String decrypted = null;
		
		try {
		
			SecretKeySpec skeySpec = new SecretKeySpec(mKey.getBytes("UTF-8"), "AES");
			javax.crypto.Cipher cipher = javax.crypto.Cipher.getInstance(transformationRule);
			IvParameterSpec ivParameterSpec = new IvParameterSpec(IV.getBytes("UTF-8"));
			cipher.init(javax.crypto.Cipher.DECRYPT_MODE, skeySpec,ivParameterSpec);
			decrypted = new String(cipher.doFinal(hexToByteArray(str)),"UTF-8");
			return decrypted;
		
		} catch (Exception e) {
			throw e;
		}
	}

	public String aescEncrypt(String str) throws Exception {
	String encrypted = null;
	
		try {
			SecretKeySpec skeySpec = new SecretKeySpec(mKey.getBytes("UTF-8"), "AES");
			IvParameterSpec ivParameterSpec = new IvParameterSpec(IV.getBytes("UTF-8"));
			javax.crypto.Cipher cipher = javax.crypto.Cipher.getInstance(transformationRule); 
			cipher.init(javax.crypto.Cipher.ENCRYPT_MODE, skeySpec,ivParameterSpec); 
			encrypted = byteArrayToHex(cipher.doFinal(str.getBytes("UTF-8")));
			return encrypted;
		
		} catch (Exception e) {
			throw e;
		}
	}

	private byte[] hexToByteArray(String s) {
		byte[] retValue = null;
		if (s != null && s.length() != 0) {
			retValue = new byte[s.length() / 2];
			for (int i = 0; i < retValue.length; i++) {
				retValue[i] = (byte) Integer.parseInt(s.substring(2 * i, 2 * i + 2), 16);
			}
		}
		return retValue;
	}

	private String byteArrayToHex(byte buf[]) {
		StringBuffer strbuf = new StringBuffer(buf.length * 2);
		for (int i = 0; i < buf.length; i++) {
			if (((int) buf[i] & 0xff) < 0x10) {
				strbuf.append("0");
			}
			strbuf.append(Long.toString((int) buf[i] & 0xff, 16));
		}
		return strbuf.toString();
	}
	
}




