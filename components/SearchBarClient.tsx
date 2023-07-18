"use client";

import React, {useState} from "react";
import SearchManufacturerClient from "./SearchManufacturerClient";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {SearchBarClientProps} from "@/types";

const SearchBar = ({setManufacturer, setModel}:SearchBarClientProps) => {
    const router = useRouter();

    const [searchManufacturer, setSearchManufacturer] = useState('');
    const [searchModel, setSearchModel] = useState('');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (searchManufacturer.trim() === '' && searchModel.trim() === '') {
            return alert('Please fill in the search bar')
        }

        setManufacturer(searchManufacturer);
        setModel(searchModel);
        // updateSearchParams(searchModel.toLowerCase(), searchManufacturer.toLowerCase());
    }

    const SearchButton = ({otherClass}: { otherClass: string }) => {
        return (
            <button type="submit" className={`-ml-3 z-10 ${otherClass}`}>
                <Image src="/magnifying-glass.svg" alt="magnifying glass" width={40} height={40}
                       className="object-contain"/>
            </button>
        )
    }

    return (
        <form className="searchbar" onSubmit={handleSearch}>
            <div className="searchbar__item">
                <SearchManufacturerClient selected={searchManufacturer} setSelected={setSearchManufacturer}/>

                <SearchButton otherClass="sm:hidden"/>
            </div>
            <div className="searchbar__item">
                <Image src="/model-icon.png" alt="car model" width={25} height={25}
                       className="absolute w-[20px] h-[20px] ml-4"/>
                <input type="text"
                       name="model"
                       placeholder="Tiguan"
                       className="searchbar__input"
                       value={searchModel}
                       onChange={(e) => setSearchModel(e.target.value)}/>
                <SearchButton otherClass="sm:hidden"/>
            </div>
            <SearchButton otherClass="max-sm:hidden"/>
        </form>
    )
}

export default SearchBar;
