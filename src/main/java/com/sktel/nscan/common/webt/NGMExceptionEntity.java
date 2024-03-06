package com.sktel.nscan.common.webt;


import java.io.Serializable;


/**
 *
 * <pre>
 * NGM 에러에 대한 정보를 담고 있는 Entity Class
 * </pre>
 *
 * <pre>
 * <작업 History>
 *
 * 2006. 4. 11. : 원재선, 최초작성
 * 2006. 8. 10. : 성일경, 주석 수정 및 불필요한 생성자 제거
 * </pre>
 *
 * @author 성일경
 *
 */
public class NGMExceptionEntity implements Serializable
{

    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = 9071460566583319082L;

    /**
     * 메세지 구분 (web에러 ngm 에러 )
     */
    private String m_sMsgInd;

    /**
     * 에러코드
     */
    private String m_sMsgId;

    /**
     * 시스템에러메시지 내용
     */
    private String m_sMsgCtt;

    /**
     * 메시지 구분코드(E,N,H,R) -> 주로 E만 사용.
     */
    private String m_sMsgTypCd;

    /**
     * 여분필드 1  추후에 추가될 수도 있는 코드나 메시지를 담기 위한 여분 코드
     */
    private String m_sNgmTemp1;

    /**
     * 여분필드 2
     */
    private String m_sNgmTemp2;

    /**
     * 여분필드 3
     */
    private String m_sNgmTemp3;


    /**
     * 기본 생성자
     *
     */
    public NGMExceptionEntity()
    {

    }


    /**
     * 생성자 - msgId와 msgCtt를 파라메터로 받음
     *
     * @param msgId      에러코드
     * @param msg           에러메시지
     */
    public NGMExceptionEntity( String msgId, String msg )
    {
        this.m_sMsgId = msgId;
        this.m_sMsgCtt = msg;
    }


    /**
     * 생성자 - msgId, msgCtt, msgInd를 파라메터로 받음
     *
     * @param msgId  에러코드
     * @param msg       에러메시지
     * @param msgInd    메시지구분
     */
    public NGMExceptionEntity( String msgId, String msg, String msgInd )
    {
        this( msgId, msg );
        this.m_sMsgInd = msgInd;
    }


    /**
     *
     * <pre>
     * 시스템 에러메시지를 반환함
     * </pre>
     *
     * @return
     */
    public String getM_sMsgCtt()
    {
        return m_sMsgCtt;
    }


    /**
     *
     * <pre>
     * 시스템 에러메시지를 세팅함
     * </pre>
     *
     * @param ctt
     */
    public void setM_sMsgCtt( String ctt )
    {
        m_sMsgCtt = ctt;
    }


    /**
     *
     * <pre>
     * 에러코드를 반환함
     * </pre>
     *
     * @return
     */
    public String getM_sMsgId()
    {
        return m_sMsgId;
    }


    /**
     *
     * <pre>
     * 에러코드를 세팅함
     * </pre>
     *
     * @param msgId
     */
    public void setM_sMsgId( String msgId )
    {
        m_sMsgId = msgId;
    }


    /**
     *
     * <pre>
     * 메시지 구분코드를 반환
     * </pre>
     *
     * @return
     */
    public String getM_sMsgInd()
    {
        return m_sMsgInd;
    }


    /**
     *
     * <pre>
     * 메시지 구분 코드를 세팅
     * </pre>
     *
     * @param msgInd
     */
    public void setM_sMsgInd( String msgInd )
    {
        m_sMsgInd = msgInd;
    }


    public String getM_sNgmTemp1()
    {
        return m_sNgmTemp1;
    }


    public void setM_sNgmTemp1( String ngmTemp1 )
    {
        m_sNgmTemp1 = ngmTemp1;
    }


    public String getM_sNgmTemp2()
    {
        return m_sNgmTemp2;
    }


    public void setM_sNgmTemp2( String ngmTemp2 )
    {
        m_sNgmTemp2 = ngmTemp2;
    }


    public String getM_sNgmTemp3()
    {
        return m_sNgmTemp3;
    }


    public void setM_sNgmTemp3( String ngmTemp3 )
    {
        m_sNgmTemp3 = ngmTemp3;
    }


    /**
     *
     * <pre>
     * 메시지 타입 구분을 반환(E,N,H,R)
     * </pre>
     *
     * @return
     */
    public String getM_sMsgTypCd()
    {
        return m_sMsgTypCd;
    }


    /**
     *
     * <pre>
     * 메시지 타입 구분을 세팅
     * </pre>
     *
     * @param msgTypCd
     */
    public void setM_sMsgTypCd( String msgTypCd )
    {
        m_sMsgTypCd = msgTypCd;
    }

}
