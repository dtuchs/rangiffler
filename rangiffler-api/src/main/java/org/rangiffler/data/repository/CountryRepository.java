package org.rangiffler.data.repository;

import jakarta.annotation.Nonnull;
import org.rangiffler.data.CountryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CountryRepository extends JpaRepository<CountryEntity, UUID> {

  @Nonnull
  Optional<CountryEntity> findByCode(String code);

  @Nonnull
  List<CountryEntity> findByOrderByNameAsc();
}
