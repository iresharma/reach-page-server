import "./header.css"

export default function Header({name, desc, image}: { name: string; desc: string; image?: string }) {
    return (
        <div className="header">
            <div className="avatar" style={{background: image === undefined ? `url(${image})` : "#bad0fa"}}>
                {name !== "" && name
                    .split(" ")
                    .map((el) => (el.length > 0 ? el[0].toUpperCase() : ""))
                    .join("")}
            </div>
            <h3>{name}</h3>
            <p>{desc}</p>
        </div>
    )
}
