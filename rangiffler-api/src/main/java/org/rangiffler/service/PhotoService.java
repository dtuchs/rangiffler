package org.rangiffler.service;


import jakarta.annotation.Nonnull;
import org.rangiffler.data.CountryEntity;
import org.rangiffler.data.LikeEntity;
import org.rangiffler.data.PhotoEntity;
import org.rangiffler.data.UserEntity;
import org.rangiffler.data.repository.CountryRepository;
import org.rangiffler.data.repository.PhotoRepository;
import org.rangiffler.data.repository.UserRepository;
import org.rangiffler.ex.NotFoundException;
import org.rangiffler.model.input.PhotoInput;
import org.rangiffler.model.type.LikeGql;
import org.rangiffler.model.type.PhotoGql;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class PhotoService {

  private final PhotoRepository photoRepository;
  private final UserRepository userRepository;
  private final CountryRepository countryRepository;

  @Autowired
  public PhotoService(PhotoRepository photoRepository, UserRepository userRepository, CountryRepository countryRepository) {
    this.photoRepository = photoRepository;
    this.userRepository = userRepository;
    this.countryRepository = countryRepository;
  }

  @Transactional
  public PhotoGql addPhoto(@Nonnull String username,
                           @Nonnull PhotoInput photoInput) {
    PhotoEntity photo = new PhotoEntity();
    CountryEntity country = countryRepository.findByCode(photoInput.country().code())
        .orElseThrow(() -> new NotFoundException("Country not found by code: " + photoInput.country().code()));
    photo.setPhoto(photoInput.src().getBytes(StandardCharsets.UTF_8));
    photo.setDescription(photoInput.description());
    photo.setCreatedDate(new Date());
    photo.setCountry(country);
    photo.setUser(getRequiredUser(username));
    return PhotoGql.fromEntity(photoRepository.save(photo));
  }

  @Transactional
  public PhotoGql editPhoto(@Nonnull String username, @Nonnull PhotoInput photoInput) {
    PhotoEntity photo = getRequiredPhoto(photoInput.id());
    if (photoInput.like() != null) {
      LikeEntity likeEntity = new LikeEntity();
      likeEntity.setCreatedDate(new Date());
      likeEntity.setUser(getRequiredUser(photoInput.like().user()));
      photo.addLikes(likeEntity);
    }
    if (userHasFullAccessToPhoto(username, photo)) {
      CountryEntity country = countryRepository.findByCode(photoInput.country().code())
          .orElseThrow(() -> new NotFoundException("Country not found by code: " + photoInput.country().code()));
      photo.setCountry(country);
      photo.setDescription(photoInput.description());
    }
    return PhotoGql.fromEntity(
        photoRepository.save(photo)
    );
  }

  private boolean userHasFullAccessToPhoto(@Nonnull String username, @Nonnull PhotoEntity photo) {
    return photo.getUser().getUsername().equals(username);
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

  @Transactional
  public void deletePhoto(@Nonnull String username, @Nonnull UUID photoId) {
    PhotoEntity photo = getRequiredPhoto(photoId);
    if (userHasFullAccessToPhoto(username, photo)) {
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
}
