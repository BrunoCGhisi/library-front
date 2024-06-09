import { useState, useEffect }  from 'react'
import { MembersVO }            from '../../services/types'
import  axios                   from 'axios';

const Membros = () => {

  const [members, setMembers]  = useState<MembersVO[]>() 
  const [nome, setNome]        = useState("");
  const [email, setEmail]      = useState("");
  const [senha, setSenha]      = useState("");
  const [cpf, setCpf]          = useState("");
  const [telefone, setTelefone]           = useState("");
  const [data_ingresso, setData_ingresso] = useState("");
  const [is_adm, setIs_adm]    = useState(0);
  const [status, setStatus]    = useState(0);

  //------------------------------------------------------

    async function getMembers(){
        try {

            const response = await axios.get("http://localhost:3000/membro");
            setMembers(response.data.membros)   

        } catch (error: any) {
            new Error(error); 
        }
    }
         
  async function postMembers() {
    try {

        const response = await axios.post('http://localhost:3000/membro', {
            nome: nome,
            email: email,
            senha: senha,
            cpf: cpf,
            telefone: telefone,
            data_ingresso: data_ingresso,
            is_adm: is_adm,
            status: status,
        });
        getMembers();
        if (response.status === 200) alert("membro cadastro com sucesso!");

    } catch (error: any) {
      console.error("Erro na requisição:", error.response.data); // Log detalhado do erro 
    }
  }
  
  async function putMembers(id:string) {
    try {
        const response = await axios.put(`http://localhost:3000/membro?id=${id}`, {
            nome: nome,
            email: email,
            senha: senha,
            cpf: cpf,
            telefone: telefone,
            data_ingresso: data_ingresso,
            is_adm: is_adm,
            status: status,
    });
        if (response.status === 200) alert("membro atualizado com sucesso!");
        getMembers(); 
    } catch (error: any) {
      console.error("Erro na requisição:", error.response.data);
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
          id  ="nome"
          placeholder='Nome'
          value ={nome}
          onChange ={(e) => setNome(e.target.value)}
        />

        <input 
          type="text"
          id  ="email"
          placeholder='Email'
          value ={email}
          onChange ={(e) => setEmail(e.target.value)}
        />

        <input 
          type="text"
          id  ="senha"
          placeholder='senha'
          value ={senha}
          onChange ={(e) => setSenha(e.target.value)}
        />

        <input 
          type="text"
          id  ="cpf"
          placeholder='Cpf'
          value ={cpf}
          onChange ={(e) => setCpf(e.target.value)}
        />
          
        <input 
          type="text"
          id  ="telefone"
          placeholder='Telefone'
          value ={telefone}
          onChange ={(e) => setTelefone(e.target.value)}
        />

        <input 
          type="text"
          id  ="data_ingresso"
          placeholder='Data_ingresso'
          value ={data_ingresso}
          onChange ={(e) => setData_ingresso(e.target.value)}
        />

        <input 
          type="text"
          id  ="is_adm"
          placeholder='Is_adm'
          value = {is_adm}
          onChange ={(e) => setIs_adm(Number(e.target.value))}
        />

        <input 
          type="text"
          id  ="status"
          placeholder='Status'
          value ={status}
          onChange ={(e) => setStatus(Number(e.target.value))}
        />

        <button onClick={postMembers}> Adicionar Membro </button>
        </div>
      )
}

export default Membros