setCount:
0: pediu para sair
1: primeiro contato
2:
3: Solicitar o Nome e gravar no debug
6: Solicitar email para enviar mais propagandas

verifica no DB, se o Contato é novo.
 se for ? {
   grava,
   setCount= +1,
   exibe o boas vindas!
  }  : {
    envia msn: Oi, pode falar, te respondo já!,
    quer ver meu menu de opções de produtos?
    digite /
  }

   já pediu para sair antes?
   se sim {
      setcount=+1,
      pergunta se quer voltar a receber as novidades pelo Whatsapp
}

***************************************************** */
if (msnRetorno === "/sim") {
  fetch("/api/whatslead", {
    body: JSON.stringify({
      whatsName: message.sender.pushname,
      whatsNumber: String(message.from).split("@")[0],
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  client.sendText(
    message.from,
    "Obrigada por ser uma(um) assinante! Vou te manter informada das novidades!!!"
    );
    return;
  }


// Solicita o Menu de Opções - na primeira vez ele recebe o menu
  client.sendText(message.from, "/");

const gerandoListaPeloWhatsapp = (client: Whatsapp) => {
  client.onMessage( message => {
  const expr = String(message.body).toUpperCase().trim();
  let aMSN = "";

    if (expr=="/") {
        aMSN = "*_Nossas Opções:_ Digite,*\n\n" +
        "*/canais* - veja minhas *redes sociais* (Instagram/Face/Telegram/Youtube)\n\n" +
        "*/grupos* - veja os grupos formados, talvez queria participar. \n\n" +
        "*/cursos* - E será adicionada(o) em uma lista preferencial para  \n\n" +
        "*/detalhes* - para saber mais detalhes sobre o produto. \n\n" +
        "*/valores*  - para obter os valores referentes ao produto. \n\n" +
        "*/sair*     - para não receber mais esse tipo de conteúdo. \n\n" +
        "*E para voltar a ter contato, basta me chamar no whatsapp novamente!* \n" +
        "-----\n" +
        "*/* - para re-exibir este menu de opções.";
    }

    if (expr=='/CANAIS') {
       aMSN ="*Minhas redes Sociais*\n" +
        "---------------------\n\n"+
        "▪️ *Instagram*\nhttps://www.instagram.com/festasdalu_/"+
        "\n\n▪️ *FaceBook*\nhttps://www.facebook.com/lucianamfer"+
        "\n\n▪️ *Youtube*\nhttps://www.youtube.com/channel/UCM67erhWa6HhOcwcm2Assmw"+
        "\n\nObrigada! \ndigite */* para visualizar o menu de opções.";
    }

    if (expr=='/SAIR'){
       aMSN =  "Obrigada! Não irei te enviar mais esse tipo de conteúdo e"+
        "caso deseje retonar, \nbasta digitar */* para visualizar o menu de opções.";
    }

    if (expr!='/' || '/SAIR'  || '/CANAIS' || '/RS'){
       aMSN =   "Olá, sou a *Lu*, uma atendente virtual, irei te manter informada(a) com notícias relevantes. \n\n" +
          "Se esse conteúdo não for do seu interesse, basta digitar */sair*, que não te enviarei mais. \n\n" +
          "E se você lembrar de alguém que conhece e que possa se interesar por essa oportunidade. *Por favor, compartilhe com ela!*";
    }
    client.sendText(message.from, aMSN);
    return;
  }
}


// 0 558681488472 558681488472@c.us Promise {
//   {
//     id: {
//       server: 'c.us',
//       user: '558681488472',
//       _serialized: '558681488472@c.us'
//     },
//     name: 'Losangelo Vivo',
//     shortName: 'Losangelo',
//     pushname: '👉🏻',
//     type: 'in',
//     isBusiness: false,
//     isEnterprise: false,
//     statusMute: false,
//     labels: [],
//     formattedName: 'Losangelo Vivo',
//     isMe: false,
//     isMyContact: true,
//     isPSA: false,
//     isUser: true,
//     isWAContact: true,
//     profilePicThumbObj: {
//       eurl: 'https://pps.whatsapp.net/v/t61.24694-24/159794380_131763112199585_1176888529439932601_n.jpg?ccb=11-4&oh=8fafc3cbe12328980d74583a919d597f&oe=60D25235',
//       id: [Object],
//       img: 'https://web.whatsapp.com/pp?e=https%3A%2F%2Fpps.whatsapp.net%2Fv%2Ft61.24694-24%2F159794380_131763112199585_1176888529439932601_n.jpg%3Fccb%3D11-4%26oh%3D8fafc3cbe12328980d74583a919d597f%26oe%3D60D25235&t=s&u=558681488472%40c.us&i=1615681072&n=sSCgfKpIQV8FayVZPxuDGbRNXNZVLlGP%2FrD7t%2FSvg4Y%3D',
//       imgFull: 'https://web.whatsapp.com/pp?e=https%3A%2F%2Fpps.whatsapp.net%2Fv%2Ft61.24694-24%2F159794380_131763112199585_1176888529439932601_n.jpg%3Fccb%3D11-4%26oh%3D8fafc3cbe12328980d74583a919d597f%26oe%3D60D25235&t=l&u=558681488472%40c.us&i=1615681072&n=sSCgfKpIQV8FayVZPxuDGbRNXNZVLlGP%2FrD7t%2FSvg4Y%3D',
//       raw: null,
//       tag: '1615681072'
//     },
//     msgs: null
//   }
// }
