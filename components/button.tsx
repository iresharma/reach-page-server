import {PageLink} from "@/types/page";

export default function Button({ link, className }: { link: PageLink; className: string }) {
    const handleClick = () => {
    //     op for analytics
        window.open(link.Link)
    }
    return <button onClick={handleClick} className={className}>
        { link.Name }
    </button>
}
