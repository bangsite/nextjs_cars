import {CustomFilter, Hero, SearchBar, ShowMore} from "@/components";
import {fetchCars} from "@/utils";
import CarCard from "@/components/CarCard";
import {HomeProps} from "@/types";
import {fuels, yearsOfProduction} from "@/constants";

export default async function ServerHome({searchParams}: HomeProps) {
    const allCars = await fetchCars({
        manufacturer: searchParams.manufacturer || '',
        year: searchParams.year || 2022,
        fuel: searchParams.fuel || '',
        limit: searchParams.limit || 10,
        model: searchParams.model || ''
    });

    console.log(allCars)

    const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;


    return (
        <main className="overflow-hidden">
            <Hero/>
            <div className="mt-12 padding-x max-width" id="discover">
                <div className="home__text-container">
                    <h1 className="text-4xl font-extrabold"> Car Catalogue</h1>
                    <p>Explore the cars you might like</p>

                </div>

                <div className="home__filters">
                    <SearchBar/>

                    <div className="home__filter-container">
                        <CustomFilter title="fuel" options={fuels}/>
                        <CustomFilter title="year" options={yearsOfProduction}/>
                    </div>

                    {
                        !isDataEmpty ? (
                            <section className="py-6">
                                <div className="home__cars-wrapper">
                                    {
                                        allCars.map((car,index) => (
                                            <CarCard key={`car-${index}`} car={car} />
                                        ))
                                    }
                                </div>
                                <ShowMore
                                    pageNumber={(searchParams.limit || 10) / 10}
                                    isNext={(searchParams.limit || 10) > allCars.length}/>
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

