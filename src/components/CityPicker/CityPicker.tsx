'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Country, City } from 'country-state-city'
import Select from 'react-select'
import { GlobeIcon } from '@heroicons/react/solid'

type option = {
  value: {
    latitude: string
    longitude: string
    isoCode: string
  }
  label: string
} | null

type cityOption = {
  value: {
    latitude: string
    longitude: string
    isoCode: string
    name: string
    stateCode: string
  }
  label: string
} | null

const options = Country.getAllCountries().map(
  (country) => ({
    value: {
      latitude: country.latitude,
      longitude: country.longitude,
      isoCode: country.isoCode,
    },
    label: country.name,
  })
)

export const CityPicker = () => {
  const [selectedCountry, setSelectedCountry] =
    useState<option>(null)
  const router = useRouter()

  const [selectedCity, setSelectedCity] =
    useState<cityOption>(null)

  const handleSelectedCountry = (option: option) => {
    setSelectedCountry(option)
    setSelectedCity(null) // reset selected city
  }

  const handleSelectedCity = (option: cityOption) => {
    setSelectedCity(option)
    router.push(
      `/locations?city=${option?.value?.name}&lat=${option?.value?.latitude}&long=${option?.value?.longitude}`
    )
  }
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-white/80">
          <GlobeIcon className="h-5 w-5 text-white" />
          <label htmlFor="country">Country</label>
        </div>
        <Select
          className="text-black"
          value={selectedCountry}
          onChange={handleSelectedCountry}
          options={options}
        />
      </div>
      {selectedCountry && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-white/80">
            <GlobeIcon className="h-5 w-5 text-white" />
            <label htmlFor="city">City</label>
          </div>
          <Select
            className="text-black"
            value={selectedCity}
            onChange={handleSelectedCity}
            options={City.getCitiesOfCountry(
              selectedCountry.value.isoCode
            )?.map((state) => ({
              value: {
                latitude: state.latitude!,
                longitude: state.longitude!,
                countryCode: state.countryCode,
                name: state.name,
                stateCode: state.stateCode,
                isoCode: '',
              },
              label: state.name,
            }))}
          />
        </div>
      )}
    </div>
  )
}
