import "./header.css"

export default function Header({name, desc, image, font, fontColor}: { name: string; desc: string; image?: string; font: string; fontColor: string; }) {
    return (
        <div className="header" style={{ font: font, color: fontColor }}>
            <div className="avatar" style={{background: image === undefined ? `url(${image})` : "#bad0fa"}}>
                {(name !== "" && name !== undefined) && name
                    .split(" ")
                    .map((el) => (el.length > 0 ? el[0].toUpperCase() : ""))
                    .join("")}
            </div>
            <h3>{name}</h3>
            <p>{desc}</p>
        </div>
    )
}
