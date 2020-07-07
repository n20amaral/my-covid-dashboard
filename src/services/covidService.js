import {NovelCovid} from 'novelcovid';

const api = new NovelCovid();

const covidService = {
    allCountries: () => api.countries(),
    allHistory: () => api.historical(true),    
    countryHistory: (country) => api.historical(null, country),
    country: (country) => api.countries(country)
}

export default covidService;