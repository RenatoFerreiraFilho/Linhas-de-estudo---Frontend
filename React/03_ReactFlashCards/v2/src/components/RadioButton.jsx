import { getNewId } from "../services/idService";

export default function RadioButton({
    id = getNewId(),
    children: label = "Descrição",
    name = "radioButtonName",
    buttonChecked = false,
    onButtonClick = null,
}) {
    function handleRadioButtonChange() {
        if (onButtonClick) {
            onButtonClick();
        }
    }
    return (
        <div className=" flex items-center space-x-2">
            <input
                className=" cursor-pointer"
                id={id}
                type="radio"
                name={name}
                checked={buttonChecked}
                onChange={handleRadioButtonChange}
            ></input>
            <label className=" cursor-pointer" htmlFor={id}>
                {label}
            </label>
        </div>
    );
}
