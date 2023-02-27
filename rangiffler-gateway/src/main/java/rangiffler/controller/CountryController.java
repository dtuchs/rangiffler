package rangiffler.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import rangiffler.model.CountryJson;
import rangiffler.service.CountryService;

import java.util.List;

@RestController
public class CountryController {

    @Autowired
    private final CountryService countryService;

    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping("/countries")
    public List<CountryJson> getAllCountries() {
        return countryService.getAllCountries();
    }
}
