import algeriaData from './algeria.json';

export interface Commune {
  id: number;
  nameAr: string;
  nameFr: string;
  nameEn: string;
  dairaAr: string;
  dairaFr: string;
}

export interface Wilaya {
  code: string;
  nameAr: string;
  nameFr: string;
  nameEn: string;
  communes: Commune[];
}

export const WILAYAS: Wilaya[] = algeriaData as Wilaya[];

export const getWilayaName = (wilaya: Wilaya, lang: string): string => {
  if (lang === 'ar') return wilaya.nameAr;
  if (lang === 'fr') return wilaya.nameFr;
  return wilaya.nameEn;
};

export const getCommuneName = (commune: Commune, lang: string): string => {
  if (lang === 'ar') return commune.nameAr;
  if (lang === 'fr') return commune.nameFr;
  return commune.nameEn;
};

export const getAllCommunes = (): Commune[] =>
  WILAYAS.flatMap((w) => w.communes);

export const getWilayaByCode = (code: string): Wilaya | undefined =>
  WILAYAS.find((w) => w.code === code);

export const getCommunesByWilaya = (code: string): Commune[] =>
  getWilayaByCode(code)?.communes ?? [];
