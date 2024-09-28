package org.rangiffler.config;

import org.rangiffler.service.CorsCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;


@EnableWebSecurity
@EnableMethodSecurity
@Configuration
public class SecurityConfig {

  private final CorsCustomizer corsCustomizer;

  public SecurityConfig(CorsCustomizer corsCustomizer) {
    this.corsCustomizer = corsCustomizer;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    corsCustomizer.corsCustomizer(http);

    http.csrf(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(customizer ->
            customizer.requestMatchers(
                    antMatcher("/graphiql/**"),
                    antMatcher("/favicon.ico"),
                    antMatcher(HttpMethod.POST, "/graphql")
                ).permitAll()
                .anyRequest()
                .authenticated()
        ).oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults()));
    return http.build();
  }
}
