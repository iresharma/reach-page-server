import {pages} from "../db"
import Header from "@/components/header.component";
import Page404 from "@/components/404.component";
import Head from 'next/head';

export const revalidate = 3600;

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

export async function generateStaticParams() {
    const cursor = await pages.find({}, { projection: { route: 1 } });
    const pageIds = await cursor.toArray();
    return pageIds.map(el => ({ route: el.route }));
}

async function getPage(route: string) {
    return await pages.findOne({route: `/${route}`})
}

export async function generateMetadata({ params }: { params: { route: string; } }) {
    const product = await getPage(params.route);
    const temp: { [key: string]: string } = {}
    if(product !== null ) {
        if(product.template.metaTags) {
            product.template.metaTags.forEach((el: Meta) => {
                const type = el.type.split(':')
                if (type[0] === 'meta') {
                    temp[type[1]] = el.value
                } else if (type[0] === 'og') {
                    // @ts-ignore
                    temp['openGraph'][type[1]] = el.value
                }
            })
        }
    }
    return { title: params.route, ...temp };
}

export default async function Page({params}: {params: {[key: string]: string};} ) {
    // @ts-ignore
    const pageData: Data | null = await pages.findOne({route: `/${params.route}`})
    if (pageData === null) {
        return <Page404/>
    }
    return (
        <>
            <Header {...pageData.template.profile} font={pageData.template.font} fontColor={pageData.template.fontColor} />
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
