package org.rangiffler.controller.query;

import org.rangiffler.model.type.CountryGql;
import org.rangiffler.service.CountryService;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class CountriesController {

  private final CountryService countryService;

  public CountriesController(CountryService countryService) {
    this.countryService = countryService;
  }

  @QueryMapping
  public List<CountryGql> countries() {
    return countryService.getAllCountries();
  }
}
