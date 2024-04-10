export default function CheckboxInput({
    labelDescription = "Descricao do checkbox", //valores-padrão, se não vier do pai, considera esse
    onCheckboxChange = null, //valores-padrão, se não vier do pai, considera esse
    id = "id_do_input_checkbox",
    autoFocus = false
}) {
    function handleCheckboxChange(){
        if (onCheckboxChange) {
            onCheckboxChange()
        }
    }
    return (
        <div className="flex flex-row items-center space-x-2 my-4">
            <input
                autoFocus={autoFocus}
                id={id}
                className="border p-1"
                type="checkbox"
                onChange={handleCheckboxChange}
            />
            <label className="text-sm mb-1" htmlFor={id}>
                {labelDescription}
            </label>
        </div>
    );
}
