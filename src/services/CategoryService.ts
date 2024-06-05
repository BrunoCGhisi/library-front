import axios            from 'axios'
import { CategoryVO }   from './types'

//Aqui vai ficar Get Put Delete Post 
//Aqui colocamos todas as funções assincronas 

//Criando uma função assincrona que recebe a lista de categoria, e retorna uma lista em forma de categoryVO
export async function getCategories(): Promise<CategoryVO[]> {
    const response = await axios.get("http://localhost:3000/categoria")
    return response.data.categorias //retornando aqui os dados que queremos de Categoria
}

