import { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import TextInput from "./components/TextInput";
import DateInput from "./components/DateInput";
import { getAgeFrom } from "./helpers/dateHelpers";
import { getNewId } from "./services/idService";
import Timer from "./components/Timer";
import CheckboxInput from "./components/CheckboxInput";
import OnlineOffline from "./components/OnlineOffline";

export default function App() {
    const [name, setName] = useState("Renato");
    const [birthDate, setBirthDate] = useState("1996-05-20");
    const [showTimer, setShowTimer] = useState(false);
    const [isOnline, setIsOnline] = useState(true)

    useEffect(() => {//preciso usar useeffect porque document.title é algo do js e nao do react
        console.log("executando");
        document.title = name;
    }, [name]); //depois que renderiza, chama o useeffect
    //o array de dependencias é o que ficarei monitorando para executar o useeffect

    useEffect(() => {
        //online
        //offline
        function toggleOnline () {
            setIsOnline(true)
        }
        function toggleOffline () {
            setIsOnline(false)
        }
        window.addEventListener('online', toggleOnline)
        window.addEventListener('offline', toggleOffline)

        return () => {
            window.removeEventListener('online', toggleOnline)
            window.removeEventListener('online', toggleOffline)
        }

    }, [])


    function handleNameChange(newName) {
        setName(newName);
    }
    function handleBirthDateChange(newDate) {
        setBirthDate(newDate);
    }
    function toggleShowTimer(){
        showTimer ? setShowTimer(false) : setShowTimer(true)
    }

    return (
        <>
            <Header> Componente Header - Projeto React-Hello </Header>
            <Main>
                <OnlineOffline isOnline={isOnline}/>
                {showTimer && (
                    <div className="text-right mt-1">
                        <Timer />
                    </div>
                )}
                <CheckboxInput labelDescription="Mostrar tempo" onCheckboxChange={toggleShowTimer}/>
                <TextInput
                    id={getNewId()}
                    labelDescription="Digite o seu nome:"
                    inputValue={name}
                    onInputChange={handleNameChange}
                    autoFocus
                />
                <DateInput
                    id={getNewId()}
                    labelDescription="Digite sua data de nascimento:"
                    inputValue={birthDate}
                    onInputChange={handleBirthDateChange}
                />
                <p>
                    O seu nome é {name}, com {name.length} caracteres, e você
                    possui {getAgeFrom(birthDate)} anos
                </p>
            </Main>
        </>
    );
}
