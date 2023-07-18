"use client";
import {useEffect, useState} from "react";
import {CustomFilterClient, Hero, SearchBarClient, ShowMoreClient} from "@/components";
import {fetchCars} from "@/utils";
import CarCard from "@/components/CarCard";
import {fuels, yearsOfProduction} from "@/constants";
import Image from "next/image";
import {CarState} from "@/types";

export default function ClientHome() {
    const [allCars, setAllCars] = useState<CarState>([])

    const [loading, setLoading] = useState(false);

    // search state
    const [manufacturer, setManufacturer] = useState("")
    const [model, setModel] = useState("")

    // filter states
    const [fuel, setFuel] = useState("");
    const [year, setYear] = useState(2022);

    // pagination states
    const [limit, setLimit] = useState(10);

    const getCars = async () => {
        setLoading(true);

        try {
            const result = await fetchCars({
                manufacturer: manufacturer || '',
                model: model || '',
                fuel: fuel || '',
                limit: limit || 10,
                year: year || 2022,
            });
            setAllCars(result);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCars();
        console.log(fuel, year, limit, manufacturer, model)
    }, [fuel, year, limit, manufacturer, model])


    return (
        <main className="overflow-hidden">
            <Hero/>
            <div className="mt-12 padding-x max-width pb-36" id="discover">
                <div className="home__text-container">
                    <h1 className="text-4xl font-extrabold"> Car Catalogue</h1>
                    <p>Explore the cars you might like</p>

                </div>

                <div className="home__filters">
                    <SearchBarClient setManufacturer={setManufacturer} setModel={setModel}/>

                    <div className="home__filter-container">
                        <CustomFilterClient options={fuels} setFilter={setFuel}/>
                        <CustomFilterClient options={yearsOfProduction} setFilter={setYear}/>
                    </div>

                    {
                        allCars.length > 0 ? (
                            <section className="py-6">
                                <div className="home__cars-wrapper">
                                    {
                                        allCars.map((car, key) => (
                                            <CarCard car={car} key={key}/>
                                        ))
                                    }
                                </div>
                                {loading && (
                                    <div className="mt-16 w-full flex-center">
                                        <Image src="/loader.svg"
                                               alt="loader"
                                               width={50}
                                               height={50}
                                               className="object-contain"
                                        />
                                    </div>
                                )

                                }
                                <ShowMoreClient
                                    pageNumber={limit / 10}
                                    isNext={limit > allCars.length}
                                    setLimit={setLimit}/>
                            </section>
                        ) : (
                            <div className="home__cars-container">
                                <h2 className="taxt-black text-xl font-bold">
                                    Oops, no result !!!
                                </h2>
                                <p>{allCars?.message}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </main>
    )
}

