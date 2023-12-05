export type MetaTag = {
    Id: string;
    TemplateId: string;
    Type: string;
    Value: string;
}

export type Template = {
    Background: string;
    Button: string;
    Desc: string;
    Font: string;
    FontColor: string;
    Id: string;
    Image: string; // the image for the header
    Name: string;
    PageId: string;
    MetaTags: MetaTag[];
}

export type PageLink = {
    Icon: string;
    Id: string;
    Link: string;
    Name: string;
    PageId: string;
    Sequence: number;
    Social: boolean;
}

export type Page = {
    Id: string;
    Links: PageLink[];
    Route: string;
    UserAccountId: string;
    Template: Template;
}
