import {pages} from "../db"
import Header from "@/components/header.component";
import Page404 from "@/components/404.component";

type link = {
    name: string;
    link: string;
}
export default async function Page({params}: {
    params: string
}) {
    const pageData = await pages.findOne({route: `/${params.route}`})
    if (pageData === null) {
        return <Page404/>
    }
    return (
        <>
            <Header {...pageData.template.profile} />
            <div className="links">
                {pageData.links.map((el: link, index: number) => (
                    <a style={{ display: "block", marginBottom: "2em" }} href={el.link} key={index} className={pageData.template.button}>
                        {el.name}
                    </a>
                ))}
            </div>
        </>
    )
}
