package org.rangiffler.service;


import org.rangiffler.data.FriendsEntity;
import org.rangiffler.data.PhotoEntity;
import org.rangiffler.data.UserEntity;
import org.rangiffler.data.repository.CountryRepository;
import org.rangiffler.data.repository.PhotoRepository;
import org.rangiffler.data.repository.UserRepository;
import org.rangiffler.model.PhotoJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
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
  public PhotoJson addPhoto(String username, PhotoJson photoJson) {
    PhotoEntity photo = new PhotoEntity();
    photo.setPhoto(photoJson.photo() != null ? photoJson.photo().getBytes(StandardCharsets.UTF_8) : null);
    photo.setDescription(photoJson.description());

    UserEntity userEntity = userRepository.findByUsername(username)
        .orElseThrow();
    userEntity.addPhotos(
        photo
    );

    userRepository.save(userEntity);
    return PhotoJson.fromEntity(photo);
  }

  @Transactional(readOnly = true)
  public List<PhotoJson> getAllUserPhotos(String username) {
    return userRepository.findByUsername(username)
        .map(UserEntity::getPhotos)
        .orElseGet(java.util.Collections::emptyList)
        .stream()
        .map(PhotoJson::fromEntity)
        .toList();
  }

  @Transactional
  public PhotoJson editPhoto(PhotoJson photoJson) {
    PhotoEntity photoEntity = photoRepository.findById(photoJson.id()).orElseThrow();
    photoEntity.setDescription(photoJson.description());
    photoEntity.setCountry(countryRepository.findByCode(photoJson.countryJson().code()).orElseThrow());
    return PhotoJson.fromEntity(
        photoRepository.save(photoEntity)
    );
  }

  @Transactional(readOnly = true)
  public List<PhotoJson> getAllFriendsPhotos(String username) {
    return userRepository.findByUsername(username)
        .map(UserEntity::getFriends)
        .orElseThrow()
        .stream()
        .map(FriendsEntity::getFriend)
        .map(UserEntity::getPhotos)
        .flatMap(java.util.Collection::stream)
        .map(PhotoJson::fromEntity)
        .toList();
  }

  @Transactional
  public void deletePhoto(UUID photoId) {
    photoRepository.deleteById(photoId);
  }
}
