import {pages} from "../db"
import Header from "@/components/header.component";
import Page404 from "@/components/404.component";

export const revalidate = 3600;

export async function generateStaticParams() {
    const cursor = await pages.find({}, { projection: { route: 1 } });
    const pageIds = await cursor.toArray();
    return pageIds.map(el => ({ route: el.route }));
}

type link = {
    name: string;
    link: string;
}
export default async function Page({params}: {params: {[key: string]: string};} ) {
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
