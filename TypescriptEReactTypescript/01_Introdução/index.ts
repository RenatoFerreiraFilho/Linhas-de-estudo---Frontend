// LIÇÃO 01
// O código JavaScript também é TypeScript
function soma1(a, b) {
    return a + b;
}
// O compilador infere o tipo das variáveis quando possível,
// caso contrário o tipo é definido implicitamente como "any"
const n1 = (4 * 7) / 3; //infere como number

// LIÇÃO 02
// Os tipos ppodem ser indicados explicitamente
function soma2(a: number, b: number): number {
    return a + b;
}
// soma2("4", 5)//vai dar erro de tipo

// LIÇÃO 03
// Podemos declarar tipos primitivos:
const varNumber: number = 1;
const varBoolean: boolean = false;
const varString: string = "react";
const varUndefined: undefined = undefined;
// Podemos declarar arrays:
const varArrayNumber: number[] = [1, 2, 3];
const varArrayString: string[] = ["a", "b", "c"];
// Podemos declarar objetos:
const varObjeto: { x: number; y: number } = { x: 1, y: 2 };

// LIÇÃO 04:
// Para separar a definição dos tipos e a atribuição de valor à variável,
//usamos interfaces
interface Aluno {
    matricula: number;
    nome: string;
    dataNascimento?: string; //campo opcional
}
let varAluno: Aluno = {
    matricula: 234,
    nome: "Renato",
};

// LIÇÃO 05:
// Podemos criar type alias
type MeuTipo = string;

// LIÇÃO 06:
// Podemos definir tipos como união de dois ou mais tipos
let varNumOuStr: number | string = 3; // o operador | tem semântica de "ou"
varNumOuStr = "x"; //não vai dar erro
// Podemos também restringir as possibilidades de valores atribuídos às variáveis daquele tipo:
type Alinhamento = "esquerda" | "direita" | "centro";
let varAlinhamento: Alinhamento = "direita"; //ok
// let varAlinhamento2: Alinhamento = "alto"//vai dar erro

// LIÇÃO 07:
// Podemos usar a interseção de tipos:
interface Programador {
    linguagemFavorita: string;
}
let varAlunoProgramador: Aluno & Programador = {
    matricula: 324,
    nome: "Renato",
    linguagemFavorita: "TypeScript",
};

// LIÇÃO 08:
// Podemos definir tipos para funções
type OperadorNumerico = (n1: number, n2: number) => number;

const opDivisao: OperadorNumerico = (n1, n2) => n1 / n2;

// LIÇÃO 09:
// Funções podem receber tipos como parâmetros
function pegaMaior<T>(a: T, b: T): T {
    //função genérica que exige que o tipo de "a" seja igual ao tipo de "b" e retorna uma variável com o mesmo tipo delas (tipo "T", que pode ser qualquer tipo)
    if (a > b) {
        return a;
    } else {
        return b;
    }
}

console.log(pegaMaior(123, 434));
