import {PageLink} from "@/types/page";
import React from "react";

type ButtonProps = React.ComponentProps<"button"> & { link: PageLink; id: string; page_route: string }

export default function Button({ link, className, page_route, id }: ButtonProps) {
    const handleClick = async () => {
        const params = new URLSearchParams();
        params.set("page", page_route)
        params.set("link", id)
        fetch((process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN ?? "") + "/clicks?" + params, {
            method:"GET",
        })
        window.open(link.Link)
    }
    return <button onClick={handleClick} className={className}>
        { link.Name }
    </button>
}
