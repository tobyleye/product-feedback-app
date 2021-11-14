export default function TextField({ label, id, type }) {
    return (
        <div className="flex flex-col">
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id}/>
        </div>
    )
}
