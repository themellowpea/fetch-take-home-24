/* eslint-disable @typescript-eslint/no-unused-vars */
export interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}
export interface Location {
  zip_code: string
  latitude: number
  longitude: number
  city: string
  state: string
  county: string
}
export interface Coordinates {
  lat: number
  lon: number
}

export interface DogSearchQueryParams {
  breeds?: string[]
  zipCodes?: number[]
  ageMin?: number
  ageMax?: number
  size?: number
  from?: number
  sort?: string
}
