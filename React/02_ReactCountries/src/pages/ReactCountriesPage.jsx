import { useState } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import TextInput from "../components/TextInput";
import { allCountries } from "../data/countries";
import Countries from "../components/Countries";
import Country from "../components/Country";

export default function ReactCountriesPage() {
    const [countryFilter, setCountryFilter] = useState("");
    const [visitedCountries, setVisitedCountries] = useState([]);

    const countryFilterLowerCase = countryFilter.toLocaleLowerCase().trim();
    const filteredCountries =
        countryFilterLowerCase.length >= 3
            ? allCountries.filter(({ nameLowerCase }) =>
                  nameLowerCase.includes(countryFilterLowerCase)
              )
            : allCountries;

    function handleCountryFilterChange(newCountryFilter) {
        setCountryFilter(newCountryFilter);
    }
    function toggleVisitedCountry(countryId) {
        let newVisitedCountries = [...visitedCountries];
        if (newVisitedCountries.indexOf(countryId) !== -1) {
            newVisitedCountries = newVisitedCountries.filter(
                (visitedCountryId) => visitedCountryId !== countryId
            );
        } else {
            newVisitedCountries.push(countryId);
        }
        setVisitedCountries(newVisitedCountries);
    }
    return (
        <>
            <Header>React Countries </Header>
            <Main>
                <TextInput
                    id="inputCountryFilter"
                    labelDescription="Informe o nome do país (pelo menos 3 letras):"
                    inputValue={countryFilter}
                    onInputChange={handleCountryFilterChange}
                    autoFocus
                />
                {/* Renato: o trecho comentado abaixo não irá funcionar.. Foi ajustado para não precisar fazer prop drilling (cascata de envio de prop) */}
                {/* <Countries
                    visitedCountries={visitedCountries}
                    onCountryClick={toggleVisitedCountry}
                >
                    {filteredCountries}
                </Countries> */}

                <Countries>
                    {/* será que nao era melhor colocar apenas a div ali em cima e remover esse Countries? */}
                    {filteredCountries.map((country) => {
                        const isVisited =
                            visitedCountries.indexOf(country.cca3) !== -1;
                        return (
                            <>
                                <h2 className="text-center font-semibold">
                                    {filteredCountries.length} país(es)
                                </h2>
                                <h3 className="text-center font-semibold text-sm">
                                    {visitedCountries.length} país(es) visitados
                                </h3>

                                <Country
                                    isVisited={isVisited}
                                    onCountryClick={toggleVisitedCountry}
                                    key={country.cca3}
                                >
                                    {country}
                                </Country>
                            </>
                        );
                    })}
                </Countries>
            </Main>
        </>
    );
}
