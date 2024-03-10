package org.rangiffler.model.input;

public record UserInput(
    String firstname,
    String surname,
    String avatar,
    CountryInput location
) {
}
