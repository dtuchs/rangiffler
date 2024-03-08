package org.rangiffler.gql;

import org.rangiffler.model.gql.SessionGql;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;

import java.util.Date;

import static java.util.Objects.requireNonNull;

@Controller
public class QuerySessionController {


  @QueryMapping
  public SessionGql session(@AuthenticationPrincipal Jwt principal) {
    if (principal != null) {
      return new SessionGql(
          principal.getClaim("sub"),
          Date.from(requireNonNull(principal.getIssuedAt())),
          Date.from(requireNonNull(principal.getExpiresAt()))
      );
    } else {
      return SessionGql.empty();
    }
  }
}
