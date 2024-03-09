package org.rangiffler.model.input;

import java.util.UUID;

public record UserInput(
    UUID id,
    String firstname,
    String surname,
    String avatar,
    CountryInput location
) {
}
