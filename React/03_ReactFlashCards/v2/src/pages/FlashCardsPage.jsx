import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Button from "../components/Button";
import FlashCard from "../components/FlashCard";
import FlashCards from "../components/FlashCards";
import Header from "../components/Header";
import Main from "../components/Main";
import { helperShuffleArray } from "../helpers/arrayHelpers";
import RadioButton from "../components/RadioButton";
import {
    apiCreateFlashCard,
    apiDeleteFlashCard,
    apiGetAllFlashCards,
    apiUpdateFlashCard,
} from "../services/apiService";
import Loading from "../components/Loading";
import Error from "../components/Error";
import FlashCardItem from "../components/FlashCardItem";
import FlashCardForm from "../components/FlashCardForm";
import { getNewId } from "../services/idService";

export default function FlashCardsPage() {
    const [studyCards, setStudyCards] = useState([]);
    const [showTitle, setShowTitle] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [createMode, setCreateMode] = useState(true);
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedFlashCard, setSelectedFlashCard] = useState(null);

    useEffect(() => {
        // // usando promise:
        // apiGetAllFlashCards().then((allFlashCards) => {
        //     const adjustedData = allFlashCards.map((card) => {
        //         return {
        //             ...card,
        //             selfShowTitle: true,
        //         };
        //     });
        //     setStudyCards(adjustedData);
        // });
        // // usando async/await:
        // async function getAllCards() {
        //     const adjustedData = await apiGetAllFlashCards();
        //     adjustedData.map((card) => {
        //         return {
        //             ...card,
        //             selfShowTitle: true,
        //         };
        //     });
        //     setStudyCards(adjustedData);
        // }
        // getAllCards();
        // usando IIFE: => (function()=>return)()

        (async function getAllCards() {
            try {
                let adjustedData = await apiGetAllFlashCards();
                console.log(adjustedData);
                adjustedData = adjustedData.map((card) => {
                    return {
                        ...card,
                        selfShowTitle: true,
                    };
                });
                setTimeout(() => {
                    setStudyCards(adjustedData);
                    setLoading(false);
                }, 1500);
            } catch (error) {
                console.log(error);
                setError(error.message);
            }
        })();
    }, []);

    function handleButtonClick() {
        const shuffledCards = helperShuffleArray(studyCards);

        setStudyCards(shuffledCards);
    }
    function handleRadioShowTitleClick() {
        setShowTitle(true);
        const updatedCards = [...studyCards];
        updatedCards.map((card) => {
            card.selfShowTitle = true;
            return card;
        });
        setStudyCards(updatedCards);
    }
    function handleRadioShowDescriptionClick() {
        setShowTitle(false);
        const updatedCards = [...studyCards];
        updatedCards.map((card) => {
            card.selfShowTitle = false;
            return card;
        });
        setStudyCards(updatedCards);
        console.log(updatedCards);
    }
    function handleToggledFlashCard(cardId) {
        const updatedCards = [...studyCards];
        const cardIndex = updatedCards.findIndex((card) => card.id === cardId);
        updatedCards[cardIndex].selfShowTitle =
            !updatedCards[cardIndex].selfShowTitle;

        setStudyCards(updatedCards);
        // allCards.filter((card) => card.id === cardId).selfShowTitle =
        //     !allCards.filter((card) => card.id === cardId).selfShowTitle;
    }
    async function handleDeleteFlashcard(cardId) {
        //BACK:
        try {
            await apiDeleteFlashCard(cardId);
            //FRONT:
            setStudyCards(studyCards.filter((card) => card.id !== cardId));
            setError("");
        } catch (error) {
            setError(error.message);
        }
    }
    function handleEditFlashCard(card) {
        setCreateMode(false);
        setSelectedTab(1);
        setSelectedFlashCard(card);
    }
    function handleTabSelect(tabIndex) {
        setSelectedTab(tabIndex);
    }
    function handleNewCard() {
        setCreateMode(true);
        setSelectedFlashCard(null);
    }

    async function handlePersist(title, description) {
        if (createMode) {
            try {
                //BACK:
                const newFlashCard = await apiCreateFlashCard(
                    title,
                    description
                );
                //FRONT:
                setStudyCards([...studyCards, newFlashCard]);
                setError("");
            } catch (error) {
                setError(error.message);
            }
        } else {
            try {
                //BACK:
                await apiUpdateFlashCard(
                    selectedFlashCard.id,
                    title,
                    description
                );
                //FRONT:
                setStudyCards(
                    studyCards.map((card) => {
                        if (card.id === selectedFlashCard.id) {
                            return {
                                ...card,
                                title: title,
                                description: description,
                            };
                        }
                        return card;
                    })
                );
                setSelectedFlashCard(null);
                setCreateMode(true);

                setError("");
            } catch (error) {
                setError(error.message);
            }
        }
    }

    var mainJsx = (
        <div className=" flex justify-center my-7">
            <Loading />
        </div>
    );
    if (error) {
        mainJsx = <Error>{error}</Error>;
    } else if (!loading) {
        mainJsx = (
            <>
                <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
                    <TabList>
                        <Tab>Listagem</Tab>
                        <Tab>Cadastro</Tab>
                        <Tab>Estudo</Tab>
                    </TabList>

                    <TabPanel>
                        {studyCards.map((flashcard) => {
                            return (
                                <FlashCardItem
                                    key={flashcard.id}
                                    onDelete={handleDeleteFlashcard}
                                    onEdit={handleEditFlashCard}
                                >
                                    {flashcard}
                                </FlashCardItem>
                            );
                        })}
                    </TabPanel>
                    <TabPanel>
                        <div className="my-4">
                            <Button onButtonClick={handleNewCard}>
                                Novo Flashcard
                            </Button>
                        </div>
                        <FlashCardForm
                            createMode={createMode}
                            onPersist={handlePersist}
                        >
                            {selectedFlashCard}
                        </FlashCardForm>
                    </TabPanel>
                    <TabPanel>
                        <div className="text-center mb-4">
                            <Button onButtonClick={handleButtonClick}>
                                Embaralhar Cards
                            </Button>
                        </div>
                        <div className=" flex justify-center space-x-5">
                            <RadioButton
                                id="radioButtonShowTitle"
                                name="showInfo"
                                buttonChecked={showTitle}
                                onButtonClick={handleRadioShowTitleClick}
                            >
                                Mostrar Título
                            </RadioButton>
                            <RadioButton
                                id="radioButtonShowDescription"
                                name="showInfo"
                                buttonChecked={!showTitle}
                                onButtonClick={handleRadioShowDescriptionClick}
                            >
                                Mostrar Descrição
                            </RadioButton>
                        </div>
                        <FlashCards>
                            {studyCards.map(
                                ({ id, title, description, selfShowTitle }) => {
                                    return (
                                        <FlashCard
                                            key={id}
                                            id={id}
                                            title={title}
                                            description={description}
                                            mainShowTitle={showTitle}
                                            selfShowTitle={selfShowTitle}
                                            onToggledFlashCard={
                                                handleToggledFlashCard
                                            }
                                        ></FlashCard>
                                    );
                                }
                            )}
                        </FlashCards>
                    </TabPanel>
                </Tabs>
            </>
        );
    }

    return (
        <>
            <Header>react-flash-cards-v3</Header>

            <Main>{mainJsx}</Main>
        </>
    );
}
