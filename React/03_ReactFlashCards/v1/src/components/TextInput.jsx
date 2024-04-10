export default function TextInput({
    labelDescription = "Descricao do label", //valores-padrão, se não vier do pai, considera esse
    inputValue = "Valor padrão do input", //valores-padrão, se não vier do pai, considera esse
    onInputChange = null, //valores-padrão, se não vier do pai, considera esse
    id = "id_do_input_text",
    autoFocus
}) {
    function handleInputChange({currentTarget}){
        if (onInputChange) {
            const newValue = currentTarget.value
            onInputChange(newValue)
        }
    }
    
    
    return (
        <div className="flex flex-col my-4">
            <label className="text-sm mb-1" htmlFor={id}>
                {labelDescription}
            </label>
            <input
                autoFocus={autoFocus}
                id={id}
                className="border p-1"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    );
}
