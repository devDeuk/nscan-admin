package com.sktel.nscan.common.utils;

import com.sun.org.apache.xml.internal.security.exceptions.Base64DecodingException;
import com.sun.org.apache.xml.internal.security.utils.Base64;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

/**
 * Created with IntelliJ IDEA.
 * 
 * 
 * 
 * 
 * 
 * 
 */
public class SHA256SaltHash {
    private Random rand;
    private boolean encoding = true;

    private SHA256SaltHash()
    {
        this.rand = new Random();
        this.encoding = true;
    }

    private SHA256SaltHash( boolean encoding )
    {
        this.rand = new Random();
        this.encoding = encoding;
    }

    private static char HEXCHARS[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };
    private static final byte HEXBYTES[] = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0, 10, 11, 12, 13, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 11, 12, 13, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };

    private static byte[] hexToByte( String str )
    {
        if ( str == null )
        {
            return new byte[0];
        }
        char values[] = str.toCharArray();
        int length = values.length;
        if ( length == 0 )
        {
            return new byte[0];
        }
        byte out[] = new byte[length + 1 >> 1];
        int i = 0;
        int iend = (length >> 1) << 1;
        int offset = 0;
        while ( i < iend )
        {
            int value = HEXBYTES[values[i++] & 127] << 4;
            value |= HEXBYTES[values[i++] & 127];
            out[offset++] = (byte) value;
        }
        if ( i < length )
        {
            out[offset] = (byte) (HEXBYTES[values[i] & 127] << 4);
        }
        return out;
    }

    private static String byteToHex( byte[] bytes )
    {
        char encoded[] = new char[bytes.length << 1];
        int offset = 0;
        for(int i=0, iend=bytes.length;i<iend;i++)
        {
            encoded[offset++] = HEXCHARS[bytes[i] >> 4 & 15];
            encoded[offset++] = HEXCHARS[bytes[i] & 15];
        }
//        for ( byte aByte : bytes )
//        {
//            encoded[offset++] = HEXCHARS[aByte >> 4 & 15];
//            encoded[offset++] = HEXCHARS[aByte & 15];
//        }
        return new String( encoded );
    }

    /**
     * 문자열 hash 시에 사용하는 salt 바이트를 배열을 생성한다.
     *
     * @return byte 배열
     */
    private byte[] getSalt()
    {
        byte salt[] = new byte[8];
        long value = rand.nextLong();
        int i = 0;
        for ( int iend = salt.length; i < iend; i++ )
        {
            salt[i] = (byte) (int) value;
            value >>= 8;
        }
        return salt;
    }

    /**
     * 2개의 byte 배열을 결합한다.
     *
     * @param first  첫번째 배열
     * @param second 두번쨰 배열
     * @return 결합한 결과
     */
    private static byte[] join( byte first[], byte second[] )
    {
        byte t[] = new byte[first.length + second.length];
        System.arraycopy( first, 0, t, 0, first.length );
        System.arraycopy( second, 0, t, first.length, second.length );
        return t;
    }

    /**
     * 문자열을 hash 하여 나온 결과값을 인코딩해서 반환한다.
     *
     * @param str hash 대상 문자열
     * @return 인코딩된 hash 값(예외가 발생할 경우 null 값을 반환한다.)
     */
    private String encrypt( String str )
    {
        return encrypt( str, getSalt() );
    }

    /**
     * 문자열을 hash 하여 나온 결과값을 인코딩해서 반환한다.
     *
     * @param str     hash 대상 문자열
     * @param saltKey salt key 값;
     * @return 인코딩된 hash 값(예외가 발생할 경우 null 값을 반환한다.)
     */
    private String encrypt( String str, byte[] saltKey )
    {
        try
        {
/*
            byte[] salt = new byte[8];
            int saltLength = saltKey.length > 8 ? 8 : saltKey.length;
            System.arraycopy( saltKey, 0, salt, 0, saltLength );
            for (; saltLength < 8; saltLength++ )
            {
                salt[saltLength] = 0;
            }
*/
//            byte[] arr = getDigest( str, salt );
            byte[] arr = getDigest( str, saltKey );
//            byte[] arr = getDigest( str, salt );
//            return "{SSHA}" + (this.encoding ? byteToHex( join( arr, salt ) ) : Base64.encode( join( arr, salt ) ));
//            System.out.println(byteToHex( arr  ));
//            System.out.println(byteToHex(join(arr, saltKey)));
            //요구사항이 {SSHA} 제거한 값을 리턴하도록 되어 있어서 수정 (20130912 : koks)
//            return this.encoding ? byteToHex( join( arr, salt ) ) : Base64.encode( join( arr, salt ) );
            return this.encoding ? byteToHex( arr ) : Base64.encode( arr );
        }
        catch ( Exception e )
        {
            return null;
        }
    }

    /**
     * digest를 생성한다.
     *
     * @param str  hash할 문자열
     * @param salt salt 바이트 배열
     * @return hash한 결과값
     * @throws NoSuchAlgorithmException
     * @throws UnsupportedEncodingException
     */
    private static byte[] getDigest( String str, byte[] salt ) throws NoSuchAlgorithmException, UnsupportedEncodingException
    {
        MessageDigest md = MessageDigest.getInstance( "SHA-256" );
        md.reset();
        md.update( str.getBytes() );
        md.update( salt );
        return md.digest();
//        md.update(salt);
//        return md.digest(str.getBytes());

    }

    /**
     * salt key 값을 byte 배열로 지정 받아서 문자열을 hash하여 나온 결과값을 hex 방식으로 인코딩한 후 {SSHA}를 앞에 붙여서 반환한다.
     *
     * @param str     has 대상 문자열
     * @param saltKey salt key 값
     * @return 인코딩된 hash 값(예외가 발생할 경우 null 값을 반환한다.)
     */
    public static String encode( String str, byte[] saltKey )
    {
        return new SHA256SaltHash().encrypt( str, saltKey );
    }

    /**
     * salt key 값을 문자열로 지정 받아서 문자열을 hash하여 나온 결과값을 hex 방식으로 인코딩한 후 {SSHA}를 앞에 붙여서 반환한다.
     *
     * @param str     has 대상 문자열
     * @param saltKey salt key 값
     * @return 인코딩된 hash 값(예외가 발생할 경우 null 값을 반환한다.)
     */
    public static String encode( String str, String saltKey )
    {
        return encode( str, saltKey.getBytes() );
    }

    /**
     * random 생성한 salt key 값을 사용하여 문자열을 hash 하여 나온 결과값을 hex 방식으로 인코딩한 후 {SSHA}를 앞에 붙여서 반환한다.
     *
     * @param str hash 대상 문자열
     * @return 인코딩된 hash 값(예외가 발생할 경우 null 값을 반환한다.)
     */
    public static String encode( String str )
    {
        return new SHA256SaltHash().encrypt( str );
    }

    /**
     * salt key 값을 byte 배열로 지정 받아서 문자열을 hash하여 나온 결과값을 선택한 encoding 방식으로 인코딩한 후 {SSHA}를 앞에 붙여서 반환한다.
     *
     * @param encoding encoding 방식( true : hex, false : Base64 )
     * @param str      has 대상 문자열
     * @param saltKey  salt key 값
     * @return 인코딩된 hash 값(예외가 발생할 경우 null 값을 반환한다.)
     */
    public static String encode( boolean encoding, String str, byte[] saltKey )
    {
        return new SHA256SaltHash( encoding ).encrypt( str, saltKey );
    }

    /**
     * salt key 값을 문자열로 지정 받아서 문자열을 hash하여 나온 결과값을 선택한 encoding 방식으로 인코딩한 후 {SSHA}를 앞에 붙여서 반환한다.
     *
     * @param encoding encoding 방식( true : hex, false : Base64 )
     * @param str      has 대상 문자열
     * @param saltKey  salt key 값
     * @return 인코딩된 hash 값(예외가 발생할 경우 null 값을 반환한다.)
     */
    public static String encode( boolean encoding, String str, String saltKey )
    {
        return encode( encoding, str, saltKey.getBytes() );
    }

    /**
     * random 생성한 salt key 값을 사용하여 문자열을 hash 하여 나온 결과값을 선택한 encoding 방식으로 인코딩한 후 {SSHA}를 앞에 붙여서 반환한다.
     *
     * @param encoding encoding 방식( true : hex, false : Base64 )
     * @param str      hash 대상 문자열
     * @return 인코딩된 hash 값(예외가 발생할 경우 null 값을 반환한다.)
     */
    public static String encode( boolean encoding, String str )
    {
        return new SHA256SaltHash( encoding ).encrypt( str );
    }

    /**
     * hex 방식으로 인코딩된 hash 값과 문자열을 비교한다.
     *
     * @param encoded hash값
     * @param str     문자열
     * @return 비교 결과
     * @throws Base64DecodingException
     * @throws NoSuchAlgorithmException
     * @throws UnsupportedEncodingException
     */
    public static boolean equal( String encoded, String str ) throws Base64DecodingException, NoSuchAlgorithmException, UnsupportedEncodingException {
        System.out.println(encoded);
        return equal(true, encoded, str);
    }

    /**
     * 정해진 encoding 방식으로 hash 값과 문자열을 비교한다.
     *
     * @param encoding encoding 방식( true : hex, false : Base64 )
     * @param encoded  hash값
     * @param str      문자열
     * @return 비교 결과
     * @throws Base64DecodingException
     * @throws NoSuchAlgorithmException
     * @throws UnsupportedEncodingException
     */
    public static boolean equal( boolean encoding, String encoded, String str ) throws Base64DecodingException, NoSuchAlgorithmException, UnsupportedEncodingException
    {
        encoded = encoded.startsWith( "{SSHA}" ) ? encoded.substring( 6 ) : encoded;
        byte[] decoded = encoding ? hexToByte( encoded ) : Base64.decode( encoded );
        byte[] salt = new byte[8];
        System.arraycopy( decoded, decoded.length - 8, salt, 0, 8 );
        byte[] arr = getDigest( str, salt );
        return encoded.equals( encoding ? byteToHex( join( arr, salt ) ) : Base64.encode( join( arr, salt ) ) );
    }

    /**
     * @param args
     * @throws Exception
     */
    public static void main( String[] args ) throws Exception {
//        String encoded = encode( "NETS", "1" );
//        System.out.println( "'" + encoded + "' = 'NETS' IS " + equal( encoded, "NETS" ) );


        System.out.println(encode("UK1488", "nets0001"));
        //System.out.println(encode("UK1487", "1q2w3e4r5t"));
        //System.out.println(encode("SC01103884", "1q2w3e4r!!"));
        //System.out.println(encode("1q2w3e4r!!", "SC01103884"));
        //System.out.println(encode("alstn0106*", "SC02115218"));
        
    	//본부
    	/*
        System.out.println(encode("sim12345", "1108198"));
        System.out.println(encode("kim12345", "1070544"));
        System.out.println(encode("jin12345", "1104911"));
        System.out.println(encode("deug1234", "1102792"));
        System.out.println(encode("deug1234", "1108687"));
        System.out.println(encode("dragon123", "1511439"));
        System.out.println(encode("yangyanga", "1109393"));
        System.out.println(encode("yangyanga", "1109509"));
        System.out.println(encode("whowho12", "1513495"));
        System.out.println(encode("whowho12", "1109686"));
        */
    	
    	//마케팅
    	/*
        System.out.println(encode("sim12345", "1103646"));
        System.out.println(encode("kim12345", "1109693"));
        System.out.println(encode("jin12345", "1109724"));
        System.out.println(encode("deug1234", "1514621"));
        System.out.println(encode("deug1234", "1107122"));
        System.out.println(encode("dragon123", "1107352"));
        System.out.println(encode("yangyanga", "1105274"));
        System.out.println(encode("yangyanga", "1103726"));
        System.out.println(encode("whowho12", "1106897"));
        System.out.println(encode("whowho12", "1107010"));        
        */

    	//대리점
    	/*
        System.out.println(encode("sim12345", "D1491426"));
        System.out.println(encode("kim12345", "D1491414"));
        System.out.println(encode("jin12345", "D1491418"));
        System.out.println(encode("deug1234", "D1491435"));
        System.out.println(encode("deug1234", "D1491440"));
        System.out.println(encode("dragon123", "D1491430"));
        System.out.println(encode("yangyanga", "D1491475"));
        System.out.println(encode("yangyanga", "D14914114"));
        System.out.println(encode("whowho12", "D14914134"));
        System.out.println(encode("whowho12", "D14914176"));        
*/
        
    	//판매자
    	/*
        System.out.println(encode("sim12345", "TTIL123"));
        System.out.println(encode("kim12345", "AYTJD76"));
        System.out.println(encode("jin12345", "LIM4121"));
        System.out.println(encode("deug1234", "JUNHO7667"));
        System.out.println(encode("deug1234", "D1312400035"));
        System.out.println(encode("dragon123", "GANJII3"));
        System.out.println(encode("yangyanga", "SSHIN0002"));
        System.out.println(encode("yangyanga", "GIGONGPHONE"));
        System.out.println(encode("whowho12", "BEST9775"));
        System.out.println(encode("whowho12", "DONGHACOM"));
        */
    	
        System.out.println(encode("sim12345", "RD135460200"));
        System.out.println(encode("kim12345", "RD149520005"));
        System.out.println(encode("jin12345", "RD333040049"));
        System.out.println(encode("deug1234", "RD133570279"));
        System.out.println(encode("deug1234", "RD231260017"));
        System.out.println(encode("dragon123", "RD135460196"));
        System.out.println(encode("yangyanga", "RD237720005"));
        System.out.println(encode("yangyanga", "RD633500018"));
        System.out.println(encode("whowho12", "RD333010008"));
        System.out.println(encode("whowho12", "RD231150052"));    	
    	
    }
}
