import {createContext, FC, ReactNode, useContext} from "react";
import {Country} from "../types/Country";
import {useGetCountries} from "../hooks/useGetCountries";

type CountriesContextData = {
    countries: Country[];
};

const CountriesContext = createContext({} as CountriesContextData);

interface CountriesContextProviderProps {
    children: ReactNode;
}

const CountriesProvider: FC<CountriesContextProviderProps> = ({children}) => {
    const {data} = useGetCountries();

    return (
        <CountriesContext.Provider value={{countries: data?.countries ?? []}}>
            {children}
        </CountriesContext.Provider>
    );
};

const useCountries = (): CountriesContextData => {
    const context = useContext(CountriesContext);

    if (!context) {
        throw new Error('useCountries must be used within an CountriesProvider');
    }

    return context;
};

export {CountriesProvider, useCountries};