// apadrinhamento-interface.js
//Para linkar o  vínculo de apadrinhamento user + pet + valor doado.

export default {
  createApadrinhamento(userId, petId, valor) {
    return fetch('/api/apadrinhamentos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, petId, valor })
    }).then(res => res.json());
  },

  getApadrinhamentosDoUsuario(userId) {
    return fetch(`/api/apadrinhamentos?userId=${userId}`)
      .then(res => res.json());
  },

  cancelarApadrinhamento(idApadrinhamento) {
    return fetch(`/api/apadrinhamentos/${idApadrinhamento}`, {
      method: 'DELETE'
    }).then(res => res.json());
  }
};
