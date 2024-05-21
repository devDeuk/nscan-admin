package com.sktel.nscan.common.interceptor;

import com.sktel.nscan.common.utils.StringUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Enumeration;


@Component
@Slf4j
public class CheckRequestInterceptor implements HandlerInterceptor {
	

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		
		//String executeIp = InetAddress.getLocalHost().getHostAddress();
		String servletPath = request.getServletPath();
		if(servletPath.indexOf(".jpg") > 0){
			return true;
		}
		log.info("===============================================");
		log.info("==================== BEGIN ====================");
		//log.info("Server Ip : {}", executeIp);
		//log.info("serverType : {}", environments.getServerType());
		log.info("request.getRemoteHost() : {}", StringUtil.strNull(request.getRemoteHost()));
		log.info("request.getHeader('X-Forwarded-For') : {}", StringUtil.strNull(request.getHeader("X-Forwarded-For")));
		log.info("request.getRemoteAddr() : {}", StringUtil.strNull(request.getRemoteAddr()));

		try {		
			String basePath = request.getScheme() + "://" + request.getServerName();


			log.info("----------------------------------------------------------------------------------------");
			log.info("# Path	");
			log.info("----------------------------------------------------------------------------------------");
			log.info("basePath : {}", basePath);
			log.info("servletPath : {}", servletPath);


//			if (!environments.isLocal() && !environments.isDevelopmemt()) {
//
//				if (basePath.startsWith("http://")) {
//					log.info("http 접근시 에러 발생");
//					String msg = "잘못된 접근입니다. https로 재접속 해주시기 바랍니다.";
//					throw new BizException("", msg);
//				}
//
//				/* sample url은 로컬에서만 동작하도록 설정. */
//				if (servletPath.indexOf("/sample/") >= 0){
//					log.info("sample url 진입 금지");
//					throw new BizException("", "잘못된 접근입니다.");
//				}
//			}

			/**  
			 *  [세션  체크]
			 *  세션이 존재하지 않으면 오류
			 *  메인 페이지는 예외
			 */
			HttpSession session = request.getSession();
			log.info("----------------------------------------------------------------------------------------");
			log.info("# Session Value");
			log.info("----------------------------------------------------------------------------------------");				
			Enumeration<String> emu = session.getAttributeNames();
			while (emu.hasMoreElements()) {
				String name = (String) emu.nextElement();
				if (name.equals("org.apache.struts.action.LOCALE"))
					continue; // Enumeration으로 했을때 이상하게 넘어오는 name이 있으므로 패스한다
				log.info("[ Session Value] name : {}, value : {}", name, session.getAttribute(name));
			}
			log.info("----------------------------------------------------------------------------------------");
			log.info("# request Value");
			log.info("----------------------------------------------------------------------------------------");
			Enumeration<String> enumeration = request.getParameterNames();
			while (enumeration.hasMoreElements()) {
				String key = (String) enumeration.nextElement();
				String value = request.getParameter(key);
				log.info("[ Request Value] " + key + " : " + value);
			}

		} catch (Exception ex) {
			//ex.printStackTrace();
			throw ex;
		}

		//return true;		//true면 접근허가
		return HandlerInterceptor.super.preHandle(request, response, handler);
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		log.info("==================== END ======================");
		log.info("===============================================");
		HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
	}
}
