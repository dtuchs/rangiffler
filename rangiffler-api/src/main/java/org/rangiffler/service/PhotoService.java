package org.rangiffler.service;


import jakarta.annotation.Nonnull;
import org.rangiffler.data.CountryEntity;
import org.rangiffler.data.LikeEntity;
import org.rangiffler.data.PhotoEntity;
import org.rangiffler.data.StatisticEntity;
import org.rangiffler.data.UserEntity;
import org.rangiffler.data.repository.CountryRepository;
import org.rangiffler.data.repository.PhotoRepository;
import org.rangiffler.data.repository.StatisticRepository;
import org.rangiffler.data.repository.UserRepository;
import org.rangiffler.ex.NotFoundException;
import org.rangiffler.model.input.PhotoInput;
import org.rangiffler.model.type.LikeGql;
import org.rangiffler.model.type.PhotoGql;
import org.rangiffler.utils.StringAsBytes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.function.Supplier;

@Service
public class PhotoService {

  private final PhotoRepository photoRepository;
  private final UserRepository userRepository;
  private final CountryRepository countryRepository;
  private final StatisticRepository statisticRepository;

  @Autowired
  public PhotoService(PhotoRepository photoRepository,
                      UserRepository userRepository,
                      CountryRepository countryRepository,
                      StatisticRepository statisticRepository) {
    this.photoRepository = photoRepository;
    this.userRepository = userRepository;
    this.countryRepository = countryRepository;
    this.statisticRepository = statisticRepository;
  }

  @Transactional
  public PhotoGql addPhoto(@Nonnull String username,
                           @Nonnull PhotoInput photoInput) {
    UserEntity user = getRequiredUser(username);

    PhotoEntity photo = new PhotoEntity();
    CountryEntity country = countryRepository.findByCode(photoInput.country().code())
        .orElseThrow(() -> new NotFoundException("Country not found by code: " + photoInput.country().code()));
    photo.setPhoto(new StringAsBytes(photoInput.src()).bytes());
    photo.setDescription(photoInput.description());
    photo.setCreatedDate(new Date());
    photo.setCountry(country);
    photo.setUser(user);

    StatisticEntity statistic = statisticRepository.findByUserAndCountry(
        user, country
    ).orElseGet(() -> {
      StatisticEntity se = new StatisticEntity();
      se.setUser(user);
      se.setCount(0);
      se.setCountry(country);
      return se;
    });
    statistic.setCount(statistic.getCount() + 1);
    statisticRepository.save(statistic);
    return PhotoGql.fromEntity(photoRepository.save(photo));
  }

  @Transactional
  public PhotoGql editPhoto(@Nonnull String username, @Nonnull PhotoInput photoInput) {
    PhotoEntity photo = getRequiredPhoto(photoInput.id());
    if (photoInput.like() != null && !photoIsLikedBy(photo, photoInput.like().user())) {
      LikeEntity likeEntity = new LikeEntity();
      likeEntity.setCreatedDate(new Date());
      likeEntity.setUser(getRequiredUser(photoInput.like().user()));
      photo.addLikes(likeEntity);
    }
    if (userHasFullAccessToPhoto(username, photo)) {
      if (photoInput.country() != null) {
        CountryEntity country = countryRepository.findByCode(photoInput.country().code())
            .orElseThrow(() -> new NotFoundException("Country not found by code: " + photoInput.country().code()));
        photo.setCountry(country);
      }
      if (photoInput.description() != null) {
        photo.setDescription(photoInput.description());
      }
    }
    return PhotoGql.fromEntity(
        photoRepository.save(photo)
    );
  }

  @Transactional(readOnly = true)
  public Slice<PhotoGql> allUserPhotos(@Nonnull String username,
                                       @Nonnull Pageable pageable) {
    UserEntity userEntity = getRequiredUser(username);
    return photoRepository.findByUser(
        userEntity,
        pageable
    ).map(PhotoGql::fromEntity);
  }

  @Transactional(readOnly = true)
  public List<LikeGql> photoLikes(@Nonnull UUID photoId) {
    return photoRepository.findById(photoId)
        .orElseThrow(() -> new NotFoundException("Can`t find photo by id: " + photoId))
        .getLikes()
        .stream()
        .map(LikeGql::fromEntity)
        .toList();
  }

  @Transactional(readOnly = true)
  public Slice<PhotoGql> allFriendsPhotos(@Nonnull String username,
                                          @Nonnull Pageable pageable) {
    UserEntity userEntity = getRequiredUser(username);
    return photoRepository.findByUserIn(
        userRepository.findFriends(userEntity),
        pageable
    ).map(PhotoGql::fromEntity);
  }

  @Transactional(readOnly = true)
  public Slice<PhotoGql> feedPhotos(@Nonnull String username,
                                    @Nonnull Pageable pageable) {
    UserEntity userEntity = getRequiredUser(username);
    List<UserEntity> meAndFriends = new ArrayList<>(
        userRepository.findFriends(userEntity)
    );
    meAndFriends.add(getRequiredUser(username));

    return photoRepository.findByUserIn(
        meAndFriends,
        pageable
    ).map(PhotoGql::fromEntity);
  }

  @Transactional
  public void deletePhoto(@Nonnull String username, @Nonnull UUID photoId) {
    PhotoEntity photo = getRequiredPhoto(photoId);
    UserEntity user = photo.getUser();
    CountryEntity country = photo.getCountry();
    if (userHasFullAccessToPhoto(username, photo)) {
      StatisticEntity statistic = statisticRepository.findByUserAndCountry(
          user, country
      ).orElseThrow(() -> new NotFoundException("Can`t find statistic by userid: " + user.getId() + " and countryId: " + country.getId()));
      statistic.setCount(statistic.getCount() - 1);
      statisticRepository.save(statistic);
      photoRepository.delete(photo);
    } else
      throw new AccessDeniedException("Can`t access to photo");
  }

  @Nonnull
  UserEntity getRequiredUser(@Nonnull String username) {
    return userRepository.findByUsername(username)
        .orElseThrow(() -> new NotFoundException("Can`t find user by username: " + username));
  }

  @Nonnull
  UserEntity getRequiredUser(@Nonnull UUID userId) {
    return userRepository.findById(userId)
        .orElseThrow(() -> new NotFoundException("Can`t find user by id: " + userId));
  }

  @Nonnull
  PhotoEntity getRequiredPhoto(@Nonnull UUID photoId) {
    return photoRepository.findById(photoId)
        .orElseThrow(() -> new NotFoundException("Can`t find photo by id: " + photoId));
  }

  private boolean photoIsLikedBy(@Nonnull PhotoEntity photo, @Nonnull UUID user) {
    return photo.getLikes()
        .stream()
        .map(LikeEntity::getUser)
        .map(UserEntity::getId)
        .anyMatch(id -> id.equals(user));
  }

  private boolean userHasFullAccessToPhoto(@Nonnull String username, @Nonnull PhotoEntity photo) {
    return photo.getUser().getUsername().equals(username);
  }
}
