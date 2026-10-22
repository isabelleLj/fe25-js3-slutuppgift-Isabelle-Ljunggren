
type Country = {
  name: string;
  nativeName?: string;
  alpha3Code: string;
  region: string;
  subregion?: string;
  capital?: string;
  flags: Flag;
  population: number;
  area?: number;
  latlng?: number[];
  languages?: Language[];
  currencies?: Record<string, Currency>;
};

type Flag = {
  png: string;
  svg: string;
};

type Currency = {
  name: string;
  symbol?: string;
};

type Language = {
  name: string;
  nativeName?: string;
  iso639_1?: string;
  iso639_2?: string;
};

