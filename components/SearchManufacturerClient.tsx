import React, {Fragment, useState} from "react";
import {Combobox, Transition} from '@headlessui/react'
import Image from "next/image";
import {SearchManufacturerClientProps} from "@/types";
import {manufacturersData} from "@/constants";

const SearchManufacturer = ({selected, setSelected}: SearchManufacturerClientProps) => {
    const [query, setQuery] = useState('');

    const filterManufacturers = query === "" ? manufacturersData : manufacturersData.filter((item) => (
        item.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
    ))

    return (
        <div className="search-manufacturer">
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative w-full">
                    <Combobox.Button className="absolute top-[14px]">
                        <Image className="ml-4" src="/car-logo.svg" width={20} height={20} alt="Car Logo"/>

                    </Combobox.Button>

                    {/* Input field for searching */}
                    <Combobox.Input className="search-manufacturer__input"
                                    placeholder="Volkswagen..."
                                    displayValue={(manufacturer: string) => manufacturer}
                                    onChange={(e) => setQuery(e.target.value)}>
                    </Combobox.Input>

                    {/* Transition for displaying the options */}
                    <Transition as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => setQuery('')}>
                        <Combobox.Options
                            className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                            static>
                            {
                                filterManufacturers.length === 0 && query !== "" ? (
                                    <Combobox.Option value={query}
                                                     className="search-manufacturer__option">
                                        Create "{query}"
                                    </Combobox.Option>
                                ) : (
                                    filterManufacturers.map(item => (
                                        <Combobox.Option
                                            key={item}
                                            value={item}
                                            className={({active}) => `relative search-manufacturer__option ${active ? "bg-primary-blue text-white" : "text-gray-900"} `}>
                                            {({active, selected}) => (
                                                <>
                                                     <span
                                                         className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                                        {item}
                                                    </span>
                                                    {selected ? (<span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-teal-600"}`}/>) : null}
                                                </>
                                            )}
                                        </Combobox.Option>
                                    ))
                                )
                            }
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

export default SearchManufacturer;
