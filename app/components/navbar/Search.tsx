'use client'

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search=()=>{
    const searchModal=useSearchModal();
    const params=useSearchParams();
    const locationValue=params?.get('locationValue');
    const startDateValue=params?.get('startDate');
    const endDateValue=params?.get('endDate');
    const guestCountValue=params?.get('guestCount');
    const {getByValue}=useCountries();

    const locationLabel=useMemo(()=>{
        if(locationValue){
            return getByValue(locationValue as string)?.label
        }
        return 'Anywhere'
    },[locationValue,getByValue]);

    const durationLabel=useMemo(()=>{
        if(startDateValue && endDateValue){
            const start=new Date(startDateValue as string);
            const end=new Date(endDateValue as string);
            let diffTime=Math.abs(end.getTime()-start.getTime());
            let diffDays=Math.ceil(diffTime/(1000*60*60*24));
            return `${diffDays} Days`
        }
        return 'Any Week'
    },[startDateValue,endDateValue]);

    const guestLabel=useMemo(()=>{
        if(guestCountValue){
            return `${guestCountValue} Guests`
        }
        return 'Add Guests'
    },[guestCountValue]);
    return(
        <div
            onClick={searchModal.onOpen}
            className="
                border-[1px]
                w-full
                md:w-auto
                py-2
                rounded-full
                shadow-sm
                hover:shadow-md
                transition
                cursor-pointer
            "
        >
            <div
                className="
                    flex
                    flex-row
                    items-center
                    justify-between
                "
            >
                <div
                    className="
                        text-sm
                        font-semibold
                        px-6
                    "
                >
                    {locationLabel}
                </div>
                <div
                    className="
                        hidden
                        sm:block
                        text-sm
                        font-semibold
                        px-6
                        border-x-[1px]
                        flex-1
                        text-center
                    "
                >
                    {durationLabel}
                </div>
                <div
                    className="
                        text-sm
                        pl-6
                        pr-2
                        text-gray-600
                        flex
                        flex-row
                        items-center
                        gap-3
                    "
                >
                    <div className="hidden sm:block"> {guestLabel}</div>
                    <div
                        className="
                            p-2
                            bg-rose-500
                            rounded-full
                            text-white
                        "
                    >
                        <BiSearch size={18}/>
                    </div>
                </div>  
            </div>

        </div>
    );
}
export default Search;