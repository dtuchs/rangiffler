package org.rangiffler.config;

import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import org.rangiffler.cors.CorsCustomizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.OidcScopes;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.server.authorization.client.InMemoryRegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.oauth2.server.authorization.settings.AuthorizationServerSettings;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;

import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Configuration
public class RangifflerAuthServiceConfig {

  private final KeyManager keyManager;
  private final String rangifflerFrontUri;
  private final String rangifflerAuthUri;
  private final CorsCustomizer corsCustomizer;

  @Autowired
  public RangifflerAuthServiceConfig(KeyManager keyManager,
                                     @Value("${rangiffler-front.base-uri}") String rangifflerFrontUri,
                                     @Value("${rangiffler-auth.base-uri}") String rangifflerAuthUri,
                                     CorsCustomizer corsCustomizer) {
    this.keyManager = keyManager;
    this.rangifflerFrontUri = rangifflerFrontUri;
    this.rangifflerAuthUri = rangifflerAuthUri;
    this.corsCustomizer = corsCustomizer;
  }

  @Bean
  @Order(Ordered.HIGHEST_PRECEDENCE)
  public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http)
      throws Exception {
    OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);
    http.getConfigurer(OAuth2AuthorizationServerConfigurer.class)
        .oidc(Customizer.withDefaults());    // Enable OpenID Connect 1.0

    http.exceptionHandling(exceptions ->
            exceptions.authenticationEntryPoint(new LoginUrlAuthenticationEntryPoint("/login"))
        )
        .oauth2ResourceServer(rs -> rs.jwt(Customizer.withDefaults()));

    corsCustomizer.corsCustomizer(http);
    return http.build();
  }

  @Bean
  public RegisteredClientRepository registeredClientRepository() {
    RegisteredClient publicClient = RegisteredClient.withId(UUID.randomUUID().toString())
        .clientId("client")
        .clientAuthenticationMethod(ClientAuthenticationMethod.NONE)
        .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
        .redirectUri(rangifflerFrontUri + "/authorized")
        .scope(OidcScopes.OPENID)
        .scope(OidcScopes.PROFILE)
        .clientSettings(ClientSettings.builder()
            .requireAuthorizationConsent(true)
            .requireProofKey(true)
            .build()
        )
        .tokenSettings(TokenSettings.builder()
            .accessTokenTimeToLive(Duration.of(2, ChronoUnit.HOURS))
            .build())
        .build();

    return new InMemoryRegisteredClientRepository(publicClient);
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return PasswordEncoderFactories.createDelegatingPasswordEncoder();
  }

  @Bean
  public AuthorizationServerSettings authorizationServerSettings() {
    return AuthorizationServerSettings.builder()
        .issuer(rangifflerAuthUri)
        .build();
  }

  @Bean
  public JWKSource<SecurityContext> jwkSource() throws NoSuchAlgorithmException {
    JWKSet set = new JWKSet(keyManager.rsaKey());
    return (jwkSelector, securityContext) -> jwkSelector.select(set);
  }

  @Bean
  public JwtDecoder jwtDecoder(JWKSource<SecurityContext> jwkSource) {
    return OAuth2AuthorizationServerConfiguration.jwtDecoder(jwkSource);
  }

  @Bean
  public FlywayMigrationStrategy repairFlyway() {
    return flyway -> {
      flyway.repair();
      flyway.migrate();
    };
  }
}
