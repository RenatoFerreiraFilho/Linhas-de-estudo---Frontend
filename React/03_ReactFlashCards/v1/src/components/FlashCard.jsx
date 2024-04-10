export default function FlashCard({
    title = "Título",
    id,
    description = "Descrição do card que deve conter um texto",
    mainShowTitle = true,
    selfShowTitle = true,
    onToggledFlashCard = null,
}) {
    function handleCardClick() {
        // setShowTitle(!showTitle)//menos elegante
        // setShowTitle((currentShowTitle) => !currentShowTitle);
        onToggledFlashCard(id);
    }
    const fontSizeClassName = selfShowTitle ? "text-xl" : "text-sm";
    return (
        <div
            className={`shadow-lg p-4 m-2 w-80 h-48 cursor-pointer
            flex items-center justify-center 
            font-semibold ${fontSizeClassName}`}
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            onClick={handleCardClick}
        >
            {selfShowTitle ? title : description}
        </div>
    );
}
