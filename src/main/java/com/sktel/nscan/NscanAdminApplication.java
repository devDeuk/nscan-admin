package com.sktel.nscan;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@EnableRedisHttpSession //Session 설정
@MapperScan(basePackages = "com.sktel.nscan.port.database")
public class NscanAdminApplication {
	//Properties 파일이 존재하는 경로
	private static final String PROPERTIES =
			"spring.config.location="
					+ "classpath:/config/application/";

	public static void main(String[] args) {
		new SpringApplicationBuilder(NscanAdminApplication.class)
				.properties(PROPERTIES)
				.run(args);
	}

}
