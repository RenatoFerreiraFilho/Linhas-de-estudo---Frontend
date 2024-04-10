import { getNewId } from "../services/idService";

export default function TextArea({
    labelDescription = "Descricao do label", //valores-padrão, se não vier do pai, considera esse
    textAreaValue = "Valor padrão do textArea", //valores-padrão, se não vier do pai, considera esse
    onTextAreaChange = null, //valores-padrão, se não vier do pai, considera esse
    id = getNewId(),
    maxLength = 230,
    rows = 4,
}) {
    function handleTextAreaChange({ currentTarget }) {
        if (onTextAreaChange) {
            const newValue = currentTarget.value;
            onTextAreaChange(newValue);
        }
    }
    const numCaract = textAreaValue.length;

    return (
        <div className="flex flex-col my-4">
            <label className="text-sm mb-1" htmlFor={id}>
                {labelDescription}
            </label>
            <textarea
                id={id}
                className="border p-1"
                maxLength={maxLength}
                rows={rows}
                value={textAreaValue}
                onChange={handleTextAreaChange}
            />
            <div className="text-right mr-1">
                <span>
                    {numCaract} / {maxLength}
                </span>
            </div>
        </div>
    );
}
