/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Home from "@/pages/home/index";

const capitalizeWord = (word: string) => {
    const firstLetter = word[0].toUpperCase();
    const othersLetters = word.substring(1);

    return `${firstLetter}${othersLetters}`;
};

const capitalize = (text: string) => {
    if (text.length === 0) {
        return "";
    }

    return text.split(" ").map(capitalizeWord).join(" ");
};

describe("Sanidade do formatador", () => {
    test("Não deveria fazer nada para uma string vazia", () => {
        expect(capitalize("")).toBe("");
    });
    test("Deveria retornar Renato para renato", () => {
        expect(capitalize("renato")).toBe("Renato");
    });
    test("Deveria retornar Renato Ferreira para renato ferreira", () => {
        expect(capitalize("renato ferreira")).toBe("Renato Ferreira");
    });
});
