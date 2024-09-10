"use client";

import React, {memo} from "react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const NotFound = memo(() => {
    const router = useRouter();

    return (
        <div className="h-screen w-screen lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16 mx-auto max-w-7xl">
            <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                <div className="relative">
                    <div className="absolute">
                        <div className="">
                            <h1 className="my-2 text-gray-800 font-bold text-2xl">
                                Looks like you&apos;ve found the doorway to the great nothing 🕳️
                            </h1>
                            <p className="my-2 text-gray-800">
                                Sorry about that! Please go back to the dashboard to get where
                                you need to go.
                            </p>
                            <Button onClick={() => router.push("/")}>Take me there!</Button>
                        </div>
                    </div>
                    <div>
                        <img
                            src="https://i.ibb.co/G9DC8S0/404-2.png"
                            alt={"disconnected"}
                        />
                    </div>
                </div>
            </div>
            <div>
                <img src="https://i.ibb.co/ck1SGFJ/Group.png" alt={"disconnected"} />
            </div>
        </div>
    );
});

export default NotFound;
