package org.rangiffler.service;

import org.rangiffler.data.repository.CountryRepository;
import org.rangiffler.model.type.CountryGql;
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
  public List<CountryGql> getAllCountries() {
    return countryRepository.findByOrderByNameAsc()
        .stream()
        .map(CountryGql::fromEntity)
        .toList();
  }

  @Transactional(readOnly = true)
  public CountryGql getCountryByCode(String code) {
    return countryRepository.findByCode(code)
        .map(CountryGql::fromEntity)
        .orElseThrow();
  }
}
