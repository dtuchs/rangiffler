package org.rangiffler.test;

import com.apollographql.java.client.ApolloClient;
import io.qameta.allure.okhttp3.AllureOkHttp3;
import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import org.rangiffler.config.Config;

public abstract class BaseGraphQLTest {
  protected static final Config CFG = Config.getInstance();

  protected final OkHttpClient httpClient = new OkHttpClient.Builder()
      .addNetworkInterceptor(new HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY))
      .addNetworkInterceptor(new AllureOkHttp3())
      .build();

  protected final ApolloClient apolloClient = new ApolloClient.Builder()
      .serverUrl(CFG.apiUrl() + "/graphql")
      .okHttpClient(httpClient)
      .build();
}
