package com.sktel.nscan.common.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Base64;

import static java.lang.System.arraycopy;
import static java.nio.charset.StandardCharsets.UTF_8;

public class SSHA {
	
	
    private static final String SSHA_TAG = "{SSHA}";
    private static final String SSHA_256_TAG = "{SSHA256}";
    private static final String algoSHA = "SHA";
    private static final String algoSHA256 = "SHA-256";
    public static final String defaultAlgo = algoSHA256;


    public static byte[] compute(byte[] salt, byte[] password, String algo) throws IllegalArgumentException {

        byte[] buff = new byte[password.length + salt.length];
        System.arraycopy(password, 0, buff, 0, password.length);
        System.arraycopy(salt, 0, buff, password.length, salt.length);

        byte[] hash = null;

        boolean isSHA = false;
        if (algoSHA.equals(algo)) {
            isSHA = true;
        }

        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance(algo);
        } catch (Exception e) {
            throw new IllegalArgumentException(e);
        }

        assert (md != null);
        md.reset();
        hash = md.digest(buff);

        if (!isSHA) {
            for (int i = 2; i <= 100; i++) {
                md.reset();
                md.update(hash);
                hash = md.digest();
            }
        }
        if (isSHA) {
            assert (hash.length == 20); // SHA output is 20 bytes
        } else {
            assert (hash.length == 32); // SHA-256 output is 32 bytes
        }
        return hash;
    }

    public static String encode(byte[] salt, byte[] hash, String algo) {
        boolean isSHA = false;

        if (algoSHA.equals(algo)) {
            isSHA = true;
        }

        int resultLength = 32;
        if (isSHA) {
            resultLength = 20;
        }

        byte[] res = new byte[resultLength + salt.length];
        arraycopy(hash, 0, res, 0, resultLength);
        arraycopy(salt, 0, res, resultLength, salt.length);

        String encoded = new String(Base64.getMimeEncoder().encode(res), UTF_8);

        String out = SSHA_256_TAG + encoded;
        if (isSHA) {
            out = SSHA_TAG + encoded;
        }

        return out;
    }

    public static boolean verify(String encoded, byte[] password) throws IllegalArgumentException {
        byte[] hash = new byte[20];
        String algo = algoSHA256;
        if (encoded.startsWith(SSHA_TAG)) {
            algo = algoSHA;
        }
        byte[] salt = decode(encoded, hash, algo);
        return verify(salt, hash, password, algo);
    }

    public static boolean verify(byte[] salt, byte[] hash, byte[] password, String algo) throws IllegalArgumentException {
        byte[] newHash = compute(salt, password, algo);
        return Arrays.equals(hash, newHash);
    }

    public static byte[] decode(String encoded, byte[] hashResult, String algo) throws IllegalArgumentException {
        boolean isSHA = false;

        if (algoSHA.equals(algo)) {
            isSHA = true;
        }

        String ssha = encoded.substring(SSHA_256_TAG.length());
        if (isSHA) {
            ssha = encoded.substring(SSHA_TAG.length());
        }

        byte[] result = Base64.getMimeDecoder().decode(ssha);

        int resultLength = 32;
        if (isSHA) {
            resultLength = 20;
        }

        byte[] salt = new byte[result.length - resultLength];

        arraycopy(result, 0, hashResult, 0, resultLength);
        arraycopy(result, resultLength, salt, 0, result.length - resultLength);

        return salt;
    }

    
	public static String genSSHA(String key, String password) {
		
		byte[] salt = key.getBytes();

		try {
			MessageDigest crypt = MessageDigest.getInstance("SHA-1");
			crypt.reset();
			crypt.update(password.getBytes());
			crypt.update(salt);
			byte[] hash = crypt.digest();

			byte[] hashPlusSalt = new byte[hash.length + salt.length];
			System.arraycopy(hash, 0, hashPlusSalt, 0, hash.length);
			System.arraycopy(salt, 0, hashPlusSalt, hash.length, salt.length);

			return "{SSHA}" + Base64.getEncoder().encodeToString(hashPlusSalt);

		} catch (NoSuchAlgorithmException e) {
			throw new RuntimeException(e);
		}
	}

}
