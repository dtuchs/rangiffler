package org.rangiffler.api;

import com.fasterxml.jackson.databind.JsonNode;
import org.rangiffler.jupiter.ApiLoginExtension;

import java.io.IOException;

public class AuthClient extends RestService {

  public AuthClient() {
    super(
        CFG.authUrl(),
        true,
        new CodeInterceptor()
    );
  }

  private final Auth auth = retrofit.create(Auth.class);

  public void doLogin(String username, String password) throws IOException {
    auth.authorize(
        "code",
        "client",
        "openid",
        CFG.frontUrl() + "/authorized",
        ApiLoginExtension.getCodeChallenge(),
        "S256"
    ).execute();

    auth.login(
        username,
        password,
        ApiLoginExtension.getCsrf()
    ).execute();

    JsonNode response = auth.token(
        "client",
        CFG.frontUrl() + "/authorized",
        "authorization_code",
        ApiLoginExtension.getCode(),
        ApiLoginExtension.getCodeVerifier()
    ).execute().body();

    ApiLoginExtension.setToken(
        response.get("id_token").asText()
    );
  }

  public void register(String username, String password) throws IOException {
    auth.requestRegForm().execute();
    auth.register(
        username,
        password,
        password,
        ApiLoginExtension.getCsrf()
    ).execute();
  }
}
