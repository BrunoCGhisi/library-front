// VO = Value Object, isso é um objeto que VAI ser percorrido pela WEB, é uma boa prática declarar dessa forma
// Estou tipando Category VO com as variaveis que ficam dentro da tabela Categoria
// Nesse caso:

export type CategoryVO = {
    id_categoria: string  //Se torna uma string
    categoria: string     //Se torna uma string
}

//proximo passo é index.ts