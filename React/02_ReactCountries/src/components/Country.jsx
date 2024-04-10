import Item from "./Item";

export default function Country({ children: country = null, onCountryClick = null, isVisited = false }) {
    if (!country) {
        return <div>Erro na base de dados</div>;
    }
    function handleCountryClick(){
        if (onCountryClick){
            onCountryClick(country.cca3)
        }
    }
    const {flags, name, capital, region, population, area} = country//destructuring
    const isVisitedClassName = isVisited ? "bg-green-100" : ""

    return (
        <div className={`${isVisitedClassName} cursor-pointer border p-2 m-2 flex flex-row items-center space-x-2`} onClick={handleCountryClick}>
            <img
                className="w-48"
                src={flags.svg}
                alt={flags.alt}
            />
            <ul>
                <li>
                    <Item label="Nome:">{name.common}</Item>
                </li>
                <li>
                    <Item label="Capital:">{capital}</Item>
                </li>
                <li>
                    <Item label="Região:">{region}</Item>
                </li>
                <li>
                    <Item label="População:">{population}</Item>
                </li>
                <li>
                    <Item label="Área:">{area}</Item>
                </li>
            </ul>
        </div>
    );
}
