package org.rangiffler.jupiter;

import org.junit.jupiter.api.extension.AfterEachCallback;
import org.junit.jupiter.api.extension.BeforeEachCallback;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.platform.commons.support.AnnotationSupport;
import org.rangiffler.api.AuthClient;
import org.rangiffler.api.ThreadLocalCookieStore;
import org.rangiffler.utils.OauthUtils;

import static org.rangiffler.jupiter.ContextHolderExtension.context;

public class ApiLoginExtension implements BeforeEachCallback, AfterEachCallback {

  public static final ExtensionContext.Namespace NAMESPACE = ExtensionContext.Namespace.create(ApiLoginExtension.class);

  private final AuthClient authClient = new AuthClient();

  @Override
  public void beforeEach(ExtensionContext context) throws Exception {
    ApiLogin apiLogin = AnnotationSupport.findAnnotation(
        context.getRequiredTestMethod(),
        ApiLogin.class
    ).orElse(AnnotationSupport.findAnnotation(
        context.getRequiredTestClass(),
        ApiLogin.class
    ).orElse(
        null
    ));

    if (apiLogin != null) {
      setCodeVerifier(OauthUtils.generateCodeVerifier());
      setCodeChallenge(OauthUtils.generateCodeChallenge(getCodeVerifier()));
      authClient.doLogin(apiLogin.username(), apiLogin.password());
    }
  }

  @Override
  public void afterEach(ExtensionContext extensionContext) throws Exception {
    ThreadLocalCookieStore.INSTANCE.removeAll();
  }

  public static void setCodeVerifier(String codeVerifier) {
    context().getStore(NAMESPACE).put("cv", codeVerifier);
  }

  public static String getCodeVerifier() {
    return context().getStore(NAMESPACE).get("cv", String.class);
  }

  public static void setCodeChallenge(String codeChallenge) {
    context().getStore(NAMESPACE).put("cc", codeChallenge);
  }

  public static String getCodeChallenge() {
    return context().getStore(NAMESPACE).get("cc", String.class);
  }

  public static void setCode(String code) {
    context().getStore(NAMESPACE).put("code", code);
  }

  public static String getCode() {
    return context().getStore(NAMESPACE).get("code", String.class);
  }

  public static void setToken(String token) {
    context().getStore(NAMESPACE).put("token", token);
  }

  public static String getToken() {
    return context().getStore(NAMESPACE).get("token", String.class);
  }

  public static String getBearerToken() {
    String token = getToken();
    return token != null ? "Bearer " + token : null;
  }

  public static String getCsrf() {
    return ThreadLocalCookieStore.INSTANCE.cookieValue("XSRF-TOKEN");
  }

  public static String getJsessionid() {
    return ThreadLocalCookieStore.INSTANCE.cookieValue("JSESSIONID");
  }

  public static String getJsessionIdCookieAsString() {
    return "JSESSIONID=" + getJsessionid();
  }
}
