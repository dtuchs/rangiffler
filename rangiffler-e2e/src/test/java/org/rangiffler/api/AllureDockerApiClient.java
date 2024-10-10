package org.rangiffler.api;

import org.junit.jupiter.api.Assertions;
import org.rangiffler.config.Config;
import org.rangiffler.model.AllureProject;
import org.rangiffler.model.AllureResults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

import java.io.IOException;

public class AllureDockerApiClient {

  private static final Logger LOG = LoggerFactory.getLogger(AllureDockerApiClient.class);
  private static final Config CFG = Config.getInstance();

  private static final Retrofit retrofit = new Retrofit.Builder()
      .baseUrl(CFG.allureDockerUrl())
      .addConverterFactory(JacksonConverterFactory.create())
      .build();

  private final AllureDockerApi allureDockerApi;

  public AllureDockerApiClient() {
    this.allureDockerApi = retrofit.create(AllureDockerApi.class);
  }

  public void clean(String projectId) throws IOException {
    allureDockerApi.cleanResults(projectId).execute();
  }

  public void generateReport(String projectId,
                             String executionName,
                             String executionFrom,
                             String executionType) throws IOException {
    allureDockerApi.generateReport(projectId, executionName, executionFrom, executionType).execute();
  }

  public void sendResultsToAllure(String projectId, AllureResults allureResults) throws IOException {
    int code = allureDockerApi.uploadResults(
        projectId,
        allureResults
    ).execute().code();
    Assertions.assertEquals(200, code);
  }

  public void createProjectIfNotExist(String projectId) throws IOException {
    int code = allureDockerApi.project(
        projectId
    ).execute().code();
    if (code == 404) {
      code = allureDockerApi.createProject(new AllureProject(projectId)).execute().code();
      Assertions.assertEquals(201, code);
    } else {
      Assertions.assertEquals(200, code);
    }
  }
}
