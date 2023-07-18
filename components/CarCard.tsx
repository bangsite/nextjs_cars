'use client';

import {useState} from "react";
import Image from "next/image";
import {CustomButton} from "@/components/index";
import {CarProps} from "@/types";
import {calculateCarRent, generateCarImageUrl} from "@/utils";
import CardDetail from "@/components/CardDetail";

interface CarCardProp {
    car: CarProps;
}

const CarCard = ({car}: CarCardProp) => {
    const {city_mpg, year, make, model, transmission, drive} = car;
    const [isOpen, setIsOpen] = useState(false);

    const carRent = calculateCarRent(city_mpg, year);

    return (
        <div className="car-card group">
            <div className="car-card__content">
                <h2 className="car-card__content-title">{make} {model}</h2>
            </div>

            <p className="flex mt-6 tex-[32px]">
                <span className="self-start text-[14px] font-medium">
                    {carRent}
                </span>
                <span className="self-end text-[14px] font-medium">
                   /day
                </span>
            </p>

            <div className="relative w-full h-40 my-3">
                <Image src={generateCarImageUrl(car)}  alt="car model" fill priority
                       className="object-container"/>
            </div>

            <div className="relative flex w-full mt-2">
                <div className="flex group-hover:invisible w-full justify-between text-gray">
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Image src="/steering-wheel.svg" alt="steering wheel"
                               className="object-container" width={20} height={20}/>

                        <p className="text-[14px]">
                            {transmission === 'a' ? 'Automatic' : 'Manual'}
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Image src="/tire.svg" alt="steering wheel"
                               className="object-container" width={20} height={20}/>

                        <p className="text-[14px]">
                            {drive.toLowerCase()}
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Image src="/gas.svg" alt="steering wheel"
                               className="object-container" width={20} height={20}/>

                        <p className="text-[14px]">
                            {city_mpg} MPG
                        </p>
                    </div>
                </div>
                <div className="car-card__btn-container">
                    <CustomButton title="View more"
                                  containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
                                  textStyles='text-white text-[14px] leading-[17px] font-bold'
                                  rightIcon='/right-arrow.svg'
                                  handleClick={() => setIsOpen(true)}/>
                </div>
            </div>

            <CardDetail isOpen={isOpen} closeModal={() => {
                setIsOpen(false)
            }} car={car}/>
        </div>
    )
}

export default CarCard;
