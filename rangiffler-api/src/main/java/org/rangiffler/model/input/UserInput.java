package org.rangiffler.model.input;

import java.util.UUID;

public record UserInput(
    String firstname,
    String surname,
    String avatar,
    CountryInput location
) {
}
