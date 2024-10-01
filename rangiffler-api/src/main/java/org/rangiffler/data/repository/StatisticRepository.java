package org.rangiffler.data.repository;

import jakarta.annotation.Nonnull;
import org.rangiffler.data.CountryEntity;
import org.rangiffler.data.StatisticEntity;
import org.rangiffler.data.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface StatisticRepository extends JpaRepository<StatisticEntity, UUID> {

  @Nonnull
  List<StatisticEntity> findAllByUserIn(List<UserEntity> user);

  @Nonnull
  Optional<StatisticEntity> findByUserAndCountry(UserEntity user, CountryEntity country);
}
