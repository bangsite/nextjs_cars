import {MouseEventHandler} from "react";

export interface CarProps {
    city_mpg: number;
    class: string;
    combination_mpg: number;
    cylinders: number;
    displacement: number;
    drive: string;
    fuel_type: string;
    highway_mpg: number;
    make: string;
    model: string;
    transmission: string;
    year: number;
}

export interface FilterProps {
    manufacturer?: string;
    year?: number;
    model?: string;
    limit?: number;
    fuel?: string;
}

export interface HomeProps {
    searchParams: FilterProps;
}

export interface CarCardProps {
    model: string;
    make: string;
    mpg: number;
    transmission: string;
    year: number;
    drive: string;
    cityMPG: number;
}


export interface CustomButtonProps {
    title: string;
    textStyles?: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
    rightIcon?: string;
    isDisabled?: boolean;
}

export interface OptionProps {
    title: string;
    value: string;
}

export interface CustomFilterProps {
    title: string;
    options: OptionProps[];
}



export interface ShowMoreProps {
    pageNumber: number;
    isNext: boolean;
}

export interface SearchManufacturerProps {
    manufacturer: string;
    setManufacturer: (manufacturer: string) => void;
}


// Client
export type CarState = CarProps[] & { message?: string };

export interface CustomFilterClientProps<T> {
    options: OptionProps[];
    setFilter: (selected: T) => void
}
export interface SearchBarClientProps {
    setManufacturer: (manufacturer: string) => void;
    setModel: (model: string) => void;
}

export interface SearchManufacturerClientProps {
    selected: string;
    setSelected: (selected: string) => void;
}
export interface ShowMoreClientProps {
    pageNumber: number;
    isNext: boolean;
    setLimit: (limit: number) => void;
}
