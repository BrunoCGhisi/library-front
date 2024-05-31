import axios from 'axios'
import { CategoryVO } from './types'



//Criando uma função assincrona que recebe a lista de categoria, e retorna uma lista em forma de categoryVO
export async function getCategories(): Promise<CategoryVO[]> {
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    return await axios.get("http://localhost:3000/categorias")
}