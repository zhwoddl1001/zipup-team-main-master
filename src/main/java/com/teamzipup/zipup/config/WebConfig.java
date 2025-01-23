package com.teamzipup.zipup.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    /*
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:C:/uploaded_files/images/");
    }

     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 정적 리소스(static/images) 처리
        registry.addResourceHandler("/images/**")
                .addResourceLocations("classpath:/static/images/");

        // 업로드된 파일은 별도 경로로 처리
        registry.addResourceHandler("/uploaded_files/**")
                .addResourceLocations("file:C:/uploaded_files/images/");
    }


}