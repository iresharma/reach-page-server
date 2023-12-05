import type {MetaTag, Page} from "@/types/page"
import Head from "next/head";
import Button from "@/components/button";
import Header from "@/components/HeaderSection";
import {CSSProperties} from "react";

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch(`${process.env.API_DOMAIN}/page/server`)
    const routes: { Routes: string[] } = await res.json()

    // Get the paths we want to pre-render based on posts
    const paths = routes.Routes.map((route) => ({
        params: { route },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export async function getStaticProps({ params }: { params:{
    route: string;
} }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`${process.env.API_DOMAIN}/page/${params.route}`)
    const page: Page = await res.json()

    // Pass post data to the page via props
    return { props: { page } }
}

function HeadSection({metaTags, title}: {metaTags: MetaTag[]; title: string}) {
    return <Head>
        <title>{title}</title>
        {metaTags.map(meta => {
            if(meta.Type.startsWith("og:")) {
                return <meta property={meta.Type} content={meta.Value} />
            } else {
                return <meta name={meta.Type} content={meta.Value} />
            }
        })}
    </Head>
}

export default function RoutePage({ page }: {page: Page}) {
    const docStyle: CSSProperties = {
        fontFamily: page.Template.Font,
        color: page.Template.FontColor,
        background: `url(${page.Template.Background})`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        minHeight: "100vh",
        padding: "0 10vw"
    }
    return <div style={docStyle}>
        <HeadSection metaTags={page.Template.MetaTags} title={page.Route} />
        <Header name={page.Template.Name} desc={page.Template.Desc} image={page.Template.Image} />
        {
            page.Links.sort((a,b) => a.Sequence - b.Sequence).map(link => <Button className={page.Template.Button} key={link.Sequence} link={link} />)
        }
    </div>
}
