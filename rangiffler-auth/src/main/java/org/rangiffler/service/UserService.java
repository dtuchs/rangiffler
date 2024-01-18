package org.rangiffler.service;

import jakarta.annotation.Nonnull;
import org.rangiffler.data.Authority;
import org.rangiffler.data.AuthorityEntity;
import org.rangiffler.data.UserEntity;
import org.rangiffler.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Autowired
  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Transactional
  public @Nonnull
  String registerUser(@Nonnull String username, @Nonnull String password) {
    UserEntity userEntity = new UserEntity();
    userEntity.setEnabled(true);
    userEntity.setAccountNonExpired(true);
    userEntity.setCredentialsNonExpired(true);
    userEntity.setAccountNonLocked(true);
    userEntity.setUsername(username);
    userEntity.setPassword(passwordEncoder.encode(password));

    AuthorityEntity readAuthorityEntity = new AuthorityEntity();
    readAuthorityEntity.setAuthority(Authority.read);
    readAuthorityEntity.setUser(userEntity);
    AuthorityEntity writeAuthorityEntity = new AuthorityEntity();
    writeAuthorityEntity.setAuthority(Authority.write);
    writeAuthorityEntity.setUser(userEntity);

    userEntity.addAuthorities(readAuthorityEntity, writeAuthorityEntity);
    return userRepository.save(userEntity).getUsername();
  }
}
