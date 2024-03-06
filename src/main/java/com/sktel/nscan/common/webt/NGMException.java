package com.sktel.nscan.common.webt;


import com.sktel.nscan.common.utils.StringUtil;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 *
 * <p>
 * NGM TP 서비스  처리과정에서 발생한 Exception 정보 클래스
 *
 * <p>
 * <작업 History><br>
 *
 * 2006.04.11 원재선  최초 생성
 *
 *
 * @author 성일경
 *
 *
 */
public class NGMException extends Exception
{

    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = 3672489432623387891L;

    /**
     * Exception Code list
     */
    private List m_sExceptionList = new ArrayList();

    /**
     * sub Error Cd
     */
    private List subErrCdList = new ArrayList();


    /**
     * 생성자 - 디폴트
     *
     */
    public NGMException()
    {
    }


    /**
     * 생성자로서  Exception의 리스트를  파라메터로 넘김
     *
     * @param sNgmErrList
     */
    public NGMException( ArrayList sNgmErrList )
    {
        for ( Iterator it = sNgmErrList.iterator(); it.hasNext(); ) {
            addException( (NGMExceptionEntity) it.next() );
        }
    }


    /**
     * 생성자로서 exception 리스트를 파라메터로 넘김
     *
     * @param errList
     */
    public NGMException( List errList )
    {
        this( new ArrayList( errList ) );
    }


    /**
     *
     * <pre>
     * NGMException을 추가한다
     * </pre>
     *
     * @param ngmExceptionEntity
     */
    public void addException( NGMExceptionEntity ngmExceptionEntity )
    {
        m_sExceptionList.add( ngmExceptionEntity );
    }


    /**
     *
     * <pre>
     * Exception 의 개수
     * </pre>
     *
     * @return
     */
    public int numberOfExceptions()
    {
        return m_sExceptionList.size();
    }


    /**
     *
     * <pre>
     * Iterator Type 으로 현재 NGMException 리스트를 반환
     * </pre>
     *
     * @return
     */
    public Iterator iterator()
    {
        return m_sExceptionList.iterator();
    }


    /**
     *
     * <pre>
     * 첫 번째 발생한 에러의 에러코드를 반환한다.
     *
     * 총 4개 까지 발생 가능한 에러 중 첫번째 것만 반환하므로 에러코드 존재를 가늠할 판단 기준이 될 수 없음.
     * 이 경우에는 isExistsErrCd( String ) 메소드를 사용할 것.
     * </pre>
     *
     * @return
     */
    public String getErrCd()
    {
        String errCd = "";

        if ( m_sExceptionList != null && m_sExceptionList.size() > 0 ) {
            NGMExceptionEntity objNGMExceptionEntity = (NGMExceptionEntity) m_sExceptionList.get( 0 );
            errCd = objNGMExceptionEntity.getM_sMsgId();
        }
        return errCd;
    }


    /**
     *
     * <pre>
     * 첫 번째 발생한 에러의 에러메시지를 반환한다.
     *
     * 총 4개 까지 발생 가능한 에러 중 첫번째 것만 반환하므로 에러메시지 존재를 가늠할 판단 기준이 될 수 없음.
     * => isExistsErrMsg( String ) 메소드를 사용할 것.
     * </pre>
     *
     * @return
     */
    public String getErrMsg()
    {
        String errMsg = "";

        if ( m_sExceptionList != null && m_sExceptionList.size() > 0 ) {
            NGMExceptionEntity objNGMExceptionEntity = (NGMExceptionEntity) m_sExceptionList.get( 0 );
            errMsg = objNGMExceptionEntity.getM_sMsgCtt();
        }
        return errMsg;
    }


    /**
     *
     * <pre>
     * 서브에러코드를 추
     * </pre>
     *
     * @param subErrCd
     */
    public void addSubErrCd( String subErrCd )
    {
        subErrCdList.add( StringUtil.strNull( subErrCd ) );
    }


    /**
     *
     * <pre>
     * 로직 분기 처리를 위한 서브에러코드가 존재하는지의 여부를 반환
     * </pre>
     *
     * @param subErrCd
     * @return
     */
    public boolean isExistsSubErrCd( String subErrCd )
    {
        return subErrCdList.contains( subErrCd );
    }


    /**
     *
     * <pre>
     * 서브에러코드들의 iterator 를 반환
     * </pre>
     *
     * @return
     */
    public Iterator iteratorSubErrCd()
    {
        return subErrCdList.iterator();
    }


    /**
     *
     * <pre>
     * 에러코드가 존재하는지의 여부를 반환
     * </pre>
     *
     * @param errCd
     * @return
     */
    public boolean isExistsErrCd( String errCd )
    {
        for ( Iterator it = m_sExceptionList.iterator(); it.hasNext(); ) {
            NGMExceptionEntity entity = (NGMExceptionEntity) it.next();
            // 에러코드 존재하는지
            if ( errCd.equals( entity.getM_sMsgId() ) ) {
                return true;
            }
        }

        return false;
    }


    /**
     *
     * <pre>
     * 에러메시지가 존재하는지의 여부를 반환
     * </pre>
     *
     * @param errMsg
     * @return
     */
    public boolean isExistsErrMsg( String errMsg )
    {
        for ( Iterator it = m_sExceptionList.iterator(); it.hasNext(); ) {
            NGMExceptionEntity entity = (NGMExceptionEntity) it.next();
            // 에러코드 존재하는지
            if ( errMsg.equals( entity.getM_sMsgCtt() ) ) {
                return true;
            }
        }

        return false;
    }


    /**
     *
     * <pre>
     * 특정 에러코드에 해당하는 에러메시지를 검색하여 반환함.
     * 만약 같은 에러코드로 여러개의 에러메시지가 존재하는 경우 첫번째 발생한 에러메시지만을 반환함.
     * 에러메시지를 발견하지 못하면 "" 빈 문자열을 반환함.
     * </pre>
     *
     * @param errCd
     * @return
     */
    public String getErrMsg( String errCd )
    {
        String resultMsg = "";

        for ( Iterator it = m_sExceptionList.iterator(); it.hasNext(); ) {
            NGMExceptionEntity entity = (NGMExceptionEntity) it.next();
            // 에러코드 존재하는지
            if ( errCd.equals( entity.getM_sMsgId() ) ) {
                resultMsg = entity.getM_sMsgCtt();
            }
        }

        return resultMsg;
    }

}
