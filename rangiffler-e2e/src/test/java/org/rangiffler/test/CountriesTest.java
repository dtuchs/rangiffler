package org.rangiffler.test;

import com.apollographql.apollo.api.ApolloResponse;
import com.apollographql.apollo.api.Error;
import com.apollographql.apollo.exception.ApolloHttpException;
import com.apollographql.java.client.ApolloCall;
import com.apollographql.java.rx2.Rx2Apollo;
import org.junit.jupiter.api.Test;
import org.rangiffler.GetCountriesQuery;
import org.rangiffler.jupiter.ApiLogin;
import org.rangiffler.jupiter.Token;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class CountriesTest extends BaseGraphQLTest {

  @Test
  @ApiLogin(username = "duck", password = "12345")
  void allCountriesTest(@Token String bearerToken) {
    ApolloCall<GetCountriesQuery.Data> apolloCall = apolloClient.query(new GetCountriesQuery())
        .addHttpHeader("Authorization", bearerToken);

    final ApolloResponse<GetCountriesQuery.Data> response = Rx2Apollo.single(apolloCall).blockingGet();
    final GetCountriesQuery.Data responseData = response.dataOrThrow();

    assertEquals(238, responseData.countries.size());
  }

  @Test
  void allCountriesUnauthorizedTest() {
    ApolloCall<GetCountriesQuery.Data> apolloCall = apolloClient.query(new GetCountriesQuery());

    final ApolloResponse<GetCountriesQuery.Data> response = Rx2Apollo.single(apolloCall).blockingGet();

    final Error firstError = response.errors.getFirst();

    assertNull(response.data);
    assertEquals("Unauthorized", firstError.getMessage());
  }

  @Test
  @ApiLogin(username = "duck", password = "12345")
  void allCountriesBrokenTokenTest(@Token String bearerToken) {
    ApolloCall<GetCountriesQuery.Data> apolloCall = apolloClient.query(new GetCountriesQuery())
        .addHttpHeader("Authorization", bearerToken + "!");

    final ApolloResponse<GetCountriesQuery.Data> response = Rx2Apollo.single(apolloCall).blockingGet();
    ApolloHttpException apolloException = (ApolloHttpException) response.exception;
    assertEquals(401, apolloException.getStatusCode());
  }
}
