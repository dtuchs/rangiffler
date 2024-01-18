package org.rangiffler.data.repository;

import jakarta.annotation.Nullable;
import org.rangiffler.data.CountryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CountryRepository extends JpaRepository<CountryEntity, UUID> {

  @Nullable
  CountryEntity findByCode(String code);
}
