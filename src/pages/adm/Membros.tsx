import { useState, useEffect }  from 'react'
import { MembersVO }            from '../../services/types'
import  axios                   from 'axios';

const Membros = () => {

  const [members, setMembers] = useState<MembersVO[]>() 
  const [nome, setNome]       = useState("");

  //------------------------------------------------------

    async function getMembers(){
        try {

            const response = await axios.get("http://localhost:3000/membro");
            console.log(response.data.membros)
            setMembers(response.data.membros)  
            
        } catch (error: any) {
            new Error(error); 
        }
    }
         
  async function postMembers() {
    try {

        const response = await axios.post('http://localhost:3000/membro', {
            nome: nome,
        });
        getMembers();
        if (response.status === 200) alert("membro cadastro com sucesso!");

    } catch (error: any) {
        new Error(error);
    }
  }
  
  async function putMembers(id:string) {
    try {
        const response = await axios.put(`http://localhost:3000/membro?id=${id}`, {
            nome: nome,
    });
        if (response.status === 200) alert("membro atualizado com sucesso!");
        getMembers(); 
    } catch (error: any) {
        new Error(error);
    }
  }

  async function delMembers(id:string) {
    try {
        const response = await axios.delete(`http://localhost:3000/membro?id=${id}`);
        getMembers(); 
        if (response.status === 200) alert("membro atualizado com sucesso!");
    } catch (error: any) {
        new Error(error);
    }
  }

//------------------------------------------------------

  useEffect(() => {
    getMembers();

}, []);   

    return (
        <div>
          <h1> Aqui estão os autores dos seus livros favoritos: </h1>
          <h2> use com sabedoria </h2>
          <h3> Separamos a obra do autor {`>:(`} </h3>
          {
            members && members?.length > 0 ? members.map((membro) => ( // tirei o ?
            <div
              key={membro.id_membro}
              style={{
                display: 'flex',
                border: '1px solid #ff0',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'center'
              }}
            > 
              <span> Id_Membro {membro.id_membro}  </span>
              <span> Nome    {membro.nome}     </span>
              <button onClick={ () => putMembers(membro.id_membro)}> Alterar Membro </button>
              <button onClick={ () => delMembers(membro.id_membro)}> Deletar Membro </button>
            </div>
          ))  : (
                <h1>Carregando...</h1>
            )
          }
         
        <input 
          type="text"
          id  ="membro"
          placeholder='Membro'
          value ={nome}
          onChange ={(e) => setNome(e.target.value)}
        />

        <button onClick={postMembers}> Adicionar Autor </button>
        </div>
      )
}

export default Membros