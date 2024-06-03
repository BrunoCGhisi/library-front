import axios from 'axios'
import { CategoryVO } from './types'

//Aqui colocamos todas as funções assincronas 


//Criando uma função assincrona que recebe a lista de categoria, e retorna uma lista em forma de categoryVO
export async function getCategories(): Promise<CategoryVO[]> {
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    const response = await axios.get("http://localhost:3000/categoria")
    return response.data.categorias //retornando aqui os dados que queremos de Categoria
}

//Criando uma função assincrona Post

export async function PostCategories(): Promise<CategoryVO[]> {
    const response = await axios.get("http://localhost:3000/categoria")
    return response.data.categorias //retornando aqui os dados que queremos de Categoria
}




