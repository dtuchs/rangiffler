package org.rangiffler.test;

import com.apollographql.java.client.ApolloClient;
import io.qameta.allure.okhttp3.AllureOkHttp3;
import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class GraphQLTest {

  private final OkHttpClient httpClient = new OkHttpClient.Builder()
      .addNetworkInterceptor(new HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY))
      .addNetworkInterceptor(new AllureOkHttp3())
      .build();

  private final ApolloClient apolloClient = new ApolloClient.Builder()
      .serverUrl("http://127.0.0.1:8080/graphql")
      .callFactory((Call.Factory) httpClient)
      .build();

  @Test
  void firstTest() {
    Assertions.assertTrue(true);
  }
}
