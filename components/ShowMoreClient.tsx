'use client';
import {ShowMoreClientProps, ShowMoreProps} from "@/types";
import {CustomButton} from "@/components/index";

const ShowMore = ({pageNumber, isNext, setLimit}: ShowMoreClientProps) => {

    const handleNavigation = () => {
        // Calculate the new limit based on the page number and navigation type
        const newLimit = (pageNumber + 1) * 10;

        setLimit(newLimit);
    };

    return (
        <div className="w-full flex-center gap-5 mt-10">
            {!isNext && (
                <CustomButton title="Show More"
                              btnType="button"
                              containerStyles="bg-primary-blue rounded-full text-white"
                              handleClick={handleNavigation}/>
            )}
        </div>
    )
}

export default ShowMore;
