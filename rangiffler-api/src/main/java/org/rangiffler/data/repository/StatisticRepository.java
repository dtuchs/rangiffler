package org.rangiffler.data.repository;

import org.rangiffler.data.CountryEntity;
import org.rangiffler.data.StatisticEntity;
import org.rangiffler.data.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface StatisticRepository extends JpaRepository<StatisticEntity, UUID> {

  List<StatisticEntity> findAllByUserIn(List<UserEntity> user);

  Optional<StatisticEntity> findByUserAndCountry(UserEntity user, CountryEntity country);
}
