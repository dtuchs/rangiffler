package org.rangiffler.service;

import org.rangiffler.data.repository.CountryRepository;
import org.rangiffler.model.CountryJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CountryService {

  private final CountryRepository countryRepository;

  @Autowired
  public CountryService(CountryRepository countryRepository) {
    this.countryRepository = countryRepository;
  }

  @Transactional(readOnly = true)
  public List<CountryJson> getAllCountries() {
    return countryRepository.findAll()
        .stream()
        .map(CountryJson::fromEntity)
        .toList();
  }

  @Transactional(readOnly = true)
  public CountryJson getCountryByCode(String code) {
    return countryRepository.findByCode(code)
        .map(CountryJson::fromEntity)
        .orElseThrow();
  }
}
