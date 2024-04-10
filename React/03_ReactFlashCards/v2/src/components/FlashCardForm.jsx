import { useEffect, useState } from "react";
import TextArea from "./TextArea";
import TextInput from "./TextInput";
import Button from "./Button";
import Error from "./Error";

export default function FlashCardForm({
    createMode = true,
    onPersist = null,
    children: flaschcard = null,
}) {
    const backgroundClassName = createMode ? "bg-green-100" : "bg-yellow-100";
    const [title, setTitle] = useState(flaschcard?.title || "");
    const [description, setDescription] = useState(
        flaschcard?.description || ""
    );
    const [error, setError] = useState("");

    useEffect(() => {
        if (createMode) {
            setTitle("");
            setDescription("");
        }
    }, [createMode]);
    function handleTitleChange(newTitle) {
        setTitle(newTitle);
    }
    function handleDescriptionChange(newDescription) {
        setDescription(newDescription);
    }
    function clearFields() {
        setTitle("");
        setDescription("");
    }
    function validateForm() {
        return title.trim() !== "" && description.trim() !== "";
    }
    function handleFormSubmit(event) {
        event.preventDefault();
        if (validateForm()) {
            setError("");
            if (onPersist) {
                onPersist(title, description);
                clearFields();
            }
        } else {
            setError("Preencha todos os campos");
        }
    }
    function handleFormReset() {
        clearFields();
    }
    return (
        <form
            className={`${backgroundClassName} p-4 `}
            onSubmit={handleFormSubmit}
            onReset={handleFormReset}
        >
            <h2>Manutenção de FlashCards</h2>

            <TextInput
                labelDescription="Título:"
                inputValue={title}
                onInputChange={handleTitleChange}
            />
            <TextArea
                labelDescription="Descrição"
                textAreaValue={description}
                onTextAreaChange={handleDescriptionChange}
            />
            <div className=" flex items-center justify-between">
                <Error>{error}</Error>
                <div>
                    <Button colorClass="bg-red-200" type="reset">
                        Limpar
                    </Button>
                    <Button colorClass="bg-green-300" type="submit">
                        Salvar
                    </Button>
                </div>
            </div>
        </form>
    );
}
