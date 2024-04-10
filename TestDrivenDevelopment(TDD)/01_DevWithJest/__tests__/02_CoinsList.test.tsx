import CoinsList from "@/pages/coinsList";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

const setFetchReturnData = (data: [{}, {}]) => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(data),
        })
    );
};

describe("General CoinsList Test", () => {
    beforeAll(() => {
        setFetchReturnData([{ id: "bitcoin" }, { id: "ethereum" }]);
    });
    test("Deveria renderizar", () => {
        render(<CoinsList />);
    });
    // https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false
    test("Deveria renderizar a informação da API", async () => {
        render(<CoinsList />);
        await screen.findByText("bitcoin");
    });
    test("Deveria filtrar a informação corretamente", async () => {
        render(<CoinsList />);

        await screen.findByText("bitcoin");
        await screen.findByText("ethereum"); //o find espera a renderização acontecer

        const filter = screen.getByLabelText(/filter/i);
        fireEvent.change(filter, { target: { value: "bit" } }); //o fireEvent espera a renderização acontecer e segura o código. Por isso não estou precisando usar mais o find daqui pra baixo

        expect(screen.getByText("bitcoin")).toBeInTheDocument(); //ver a tabela que mostra os diferentes retornos nas diferentes situações, de queryByText e getByText
        expect(screen.queryByText("ethereum")).not.toBeInTheDocument(); //ver a tabela que mostra os diferentes retornos nas diferentes situações, de queryByText e getByText
    });
});
