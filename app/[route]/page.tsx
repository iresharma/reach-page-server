import {pages} from "../db"
import Header from "@/components/header.component";
import Page404 from "@/components/404.component";
import Head from 'next/head';

export const revalidate = 3600;

export async function generateStaticParams() {
    const cursor = await pages.find({}, { projection: { route: 1 } });
    const pageIds = await cursor.toArray();
    return pageIds.map(el => ({ route: el.route }));
}

type Link = {
    name: string;
    link: string;
}

type Meta = {
    value: string;
    type: string;
}

type Data = {
    route: string;
    links: Link[];
    template: {
        profile: {
            name:string;
            desc:string;
            image:string;
        };
        button:string;
        background:string;
        font:string;
        fontColor:string;
        metaTags:Meta[];
    };
}


export default async function Page({params}: {params: {[key: string]: string};} ) {
    // @ts-ignore
    const pageData: Data | null = await pages.findOne({route: `/${params.route}`})
    if (pageData === null) {
        return <Page404/>
    }
    return (
        <>
            <Head>
                <title>{params.route}</title>
                {pageData.template.metaTags.map((el: Meta, index: number) => <meta key={index} name={el.type} content={el.value} />)}
            </Head>
            <Header {...pageData.template.profile} font={pageData.template.font} fontColor={pageData.template.fontColor} />
            <pre>{JSON.stringify(pageData.template.metaTags, null, 4)}</pre>
            <div className="links">
                {pageData.links.map((el: Link, index: number) => (
                    <a style={{ display: "block", marginBottom: "2em" }} href={el.link} key={index} className={pageData.template.button}>
                        {el.name}
                    </a>
                ))}
            </div>
        </>
    )
}
