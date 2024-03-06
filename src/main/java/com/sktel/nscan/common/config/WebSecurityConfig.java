package com.sktel.nscan.common.config;

//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.builders.WebSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * WebSecurityConfig 의 설명을 여기에 작성한다.
 * @author  2022/03/28
 * @Version 1.0.0
 * @Date ihyejin
 * @Description :  Spring Security 암&복호화 알고리즘을 사용하기 위해 Config 설정 필요
 * ===========================================================================
 * DATE         AUTHOR          NOTE
 -----------------------------------------------------------------------------
 */

//@Configuration
//@EnableGlobalMethodSecurity(prePostEnabled = true)
//@EnableWebSecurity
//@RequiredArgsConstructor
//public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
// private final AuthProvider authProvider;
// private final AuthFailureHandler authFailureHandler;
// private final AuthSuccessHandler authSuccessHandler;
//
//
// private final UserServiceImpl userService;
// // 정적인 파일에 대한 요청들
// private static final String[] AUTH_WHITELIST = {
//         // -- swagger ui
//         "/v2/api-docs",
//         "/v3/api-docs/**",
//         "/configuration/ui",
//         "/swagger-resources/**",
//         "/configuration/security",
//         "/swagger-ui.html",
//         "/webjars/**",
//         "/file/**",
//         "/image/**",
//         "/swagger/**",
//         "/swagger-ui/**",
//         // other public endpoints of your API may be appended to this array
//         "/h2/**",
//         "/**"
// };
//
// @Bean
// public PasswordEncoder getPasswordEncoder() {
//  return new BCryptPasswordEncoder();
// }
//
// @Override
// public void configure(WebSecurity web) {
//  // 정적인 파일 요청에 대해 무시
//  web.ignoring().antMatchers(AUTH_WHITELIST);
// }
//
// @Override
// protected void configure(HttpSecurity http) throws Exception {
//  // 로그인 설정
//  http
//          .csrf().disable()
//          .authorizeRequests()
//          .antMatchers("/admin/**").hasRole("ADMIN")
//          .antMatchers("/anonymous*").anonymous()
//          .antMatchers("/login*").permitAll()
//          .anyRequest().authenticated()
//          .and()
//          .formLogin()
//          .loginPage("/login.html")
//          .loginProcessingUrl("/perform_login")
//          .defaultSuccessUrl("/homepage.html", true)
//          .failureUrl("/login.html?error=true")
//          .failureHandler(authFailureHandler)
//          .and()
//          .logout()
//          .logoutUrl("/perform_logout")
//          .deleteCookies("JSESSIONID");
// }
//
// @Override
// protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//  auth.authenticationProvider(authProvider);
// }
//
//}