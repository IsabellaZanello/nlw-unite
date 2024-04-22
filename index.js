let participantes = [
  {
    nome: "Isabella Zanello",
    email: "isabella@gmail",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Bruno Felix",
    email: "bruno@gmail",
    dataInscricao: new Date(2024, 1, 02, 19, 23),
    dataCheckIn: new Date(2024, 1, 05, 20, 20)
  },
  {
    nome: "Julia Zanello",
    email: "julia@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 14, 30),
    dataCheckIn: null
  },
  {
    nome: "Leticia Zanello",
    email: "leticia@gmail.com",
    dataInscricao: new Date(2024, 4, 10, 8, 0),
    dataCheckIn: new Date(2024, 4, 15, 16, 30)
  },
  {
    nome: "Laura Zanello",
    email: "laura@gmail.com",
    dataInscricao: new Date(2024, 5, 20, 11, 15),
    dataCheckIn: null
  },
  {
    nome: "Anna Felix",
    email: "anna@gmail.com",
    dataInscricao: new Date(2024, 6, 8, 17, 45),
    dataCheckIn: new Date(2024, 6, 12, 21, 10)
  },
  {
    nome: "Otavio Félix",
    email: "otavio@gmail.com",
    dataInscricao: new Date(2024, 7, 15, 10, 0),
    dataCheckIn: null
  },
  {
    nome: "Gizeli Zanello",
    email: "gizeli@gmail.com",
    dataInscricao: new Date(2024, 8, 3, 8, 30),
    dataCheckIn: new Date(2024, 8, 7, 12, 15)
  },
  {
    nome: "Ernani Alves",
    email: "ernani@gmail.com",
    dataInscricao: new Date(2024, 9, 11, 13, 10),
    dataCheckIn: null
  },
  {
    nome: "Edison Félix",
    email: "edison@gmail.com",
    dataInscricao: new Date(2024, 10, 19, 20, 45),
    dataCheckIn: null
  }
];

participantes.slice(0, 10);


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)
  
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
    data-email="${participante.email}"
    onclick="fazerCheckIn(event)"
    >
    Confirmar Check-In
    </button>
    `
  }

  return `
  <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
 let output = ""

for(let participante of participantes) {
  output = output + criarNovoParticipante(participante)
}

 document
 .querySelector('tbody')
 .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)
  
  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  even.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]'). value = ""
}

const fazerCheckIn = (event) => {

  const mensagemConfirmacao = 'Tem certeza que deseja realizar o check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return
  }
  
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}