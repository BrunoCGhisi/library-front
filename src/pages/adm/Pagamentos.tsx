import { useState, useEffect }  from 'react'
import { PaymentsVO }            from '../../services/types'
import  axios                   from 'axios';

const Pagamentos = () => {

  const [payments, setPayments]  = useState<PaymentsVO[]>() 
  const [fk_membro, setFk_membro]      = useState("");
  const [fk_multa, setFk_multa]        = useState("");
  const [data_pagamento, setData_pagamento]  = useState("");
  const [valor, setValor]      = useState("");
  //------------------------------------------------------

    async function getPayments(){
        try {

            const response = await axios.get("http://localhost:3000/pagamento");
            setPayments(response.data.pagamentos)   

        } catch (error: any) {
            new Error(error); 
        }
    }
         
  async function postPayments() {
    try {
      
        const response = await axios.post('http://localhost:3000/pagamento', {
            fk_membro : fk_membro,
            fk_multa : fk_multa,
            data_pagamento : data_pagamento,
            valor : valor,
        });
        getPayments();
        if (response.status === 200) alert("membro cadastro com sucesso!");

    } catch (error: any) {
      console.error("Erro na requisição:", error.response.data); // Log detalhado do erro 
    }
  }
  
  async function putPayments(id:string) {
    try {

        const response = await axios.put(`http://localhost:3000/pagamento?id=${id}`);
        if (response.status === 200) alert("membro atualizado com sucesso!");
        getPayments(); 
    } catch (error: any) {
      console.error("Erro na requisição:", error.response.data);
    }
  }

  async function delPayments(id:string) {
    try {
        const response = await axios.delete(`http://localhost:3000/pagamento?id=${id}`);
        getPayments(); 
        if (response.status === 200) alert("membro atualizado com sucesso!");
    } catch (error: any) {
        new Error(error);
    }
  }

//------------------------------------------------------

  useEffect(() => {
    getPayments();

}, []);   

    return (
        <div>
          <h1> Aqui estão os autores dos seus livros favoritos: </h1>
          <h2> use com sabedoria </h2>
          <h3> Separamos a obra do autor {`>:(`} </h3>
          {
            payments && payments?.length > 0 ? payments.map((pagamento) => ( // tirei o ?
            <div
              key={pagamento.id_pagamento}
              style={{
                display: 'flex',
                border: '1px solid #ff0',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'center'
              }}
            > 
              <span> Id_pagamento {pagamento.id_pagamento}  </span>
              <span> Valor    {pagamento.valor}     </span>
              <button onClick={ () => putPayments(pagamento.id_pagamento)}> Alterar pagamento </button>
              <button onClick={ () => delPayments(pagamento.id_pagamento)}> Deletar pagamento </button>
            </div>
          ))  : (
                <h1>Carregando...</h1>
            )
          }
         
        <input 
          type="text"
          id  ="fk_membro"
          placeholder='fk_membro'
          value ={fk_membro}
          onChange ={(e) => setFk_membro(e.target.value)}
        />

        <input 
          type="text"
          id  ="fk_multa"
          placeholder='fk_multa'
          value ={fk_multa}
          onChange ={(e) => setFk_multa(e.target.value)}
        />

        <input 
          type="text"
          id  ="data_pagamento"
          placeholder='data_pagamento'
          value ={data_pagamento}
          onChange ={(e) => setData_pagamento(e.target.value)}
        />

        <input 
          type="text"
          id  ="valor"
          placeholder='valor'
          value ={valor}
          onChange ={(e) => setValor(e.target.value)}
        />

        <button onClick={postPayments}> Adicionar Membro </button>
        </div>
      )
}

export default Pagamentos; 