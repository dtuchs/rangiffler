package org.rangiffler.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record AllureResults(@JsonProperty("results") List<DecodedAllureFile> results) {
}
