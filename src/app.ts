import { create, Whatsapp } from "venom-bot";
import express from "express";
import cors from "cors";
import { requestLoggerMiddleware } from "./middleware/request.Logger.middleware";
// import mongoose from 'mongoose'
import runDB from "./middleware/dbMongoose";
import WhatsLead from "./model/whatsLead.model";
import Control from "./model/control.model";
// import is_mobile from './middleware/detect.mobile'
// import whats_navigator from "./middleware/detect_navigator";

// import {WhatsLeadRoutes} from './routes/whatslead.routes'

/**
* Usarei isso na rota, chamo via axios
* toda parte de db fica nas rotas
* import run from './middleware/dbMongoose'
**/

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLoggerMiddleware);
// app.use(WhatsLeadRoutes);
// import { api } from './services/api'

export default async function WbotStart() {

  try {
    await create("Festeiras2")
      .then((client: Whatsapp) => gerandoListaPeloWhatsapp(client))
      .catch((error) => {
        console.log(error);
        return;
      });
  } catch (error) {
    console.log(error);
    return;
  }
}
WbotStart();

/**
 * Todo o processamento das ações aqui em:
 * gerandoListaPeloWhatsapp()
 */
async function gerandoListaPeloWhatsapp(client: Whatsapp) {
  /**
   * runDB() - Verifica e conecta o banco de dados mongodb.
   **/
  runDB();

  client.onMessage(async (message) => {
    const expr = String(message.body).toUpperCase().trim();
    let aMSN = "";
    //Opções de comandos pre-configurados
    switch (expr) {
      case "/":
        aMSN =
          "*_Nossas Opções,_ Digite:,*\n" +
          "-----\n" +
          "*/Canais* - Veja minhas *redes sociais* (Instagram/Face/Telegram/Youtube)\n\n" +
          // "*/Grupos* - veja os grupos formados, talvez queria participar. \n\n" +
          // "*/Cursos* - E será adicionada(o) em uma lista preferencial para  \n\n" +
          // "*/Detalhes* - para saber mais detalhes sobre o produto. \n\n" +
          // "*/Valores*  - para obter os valores referentes ao produto. \n\n" +
          "*/Pix*      - Receba meu PIX e efetue seu pagamento. \n\n" +
          "*/Sair*     - para não receber mais esse tipo de conteúdo." +
          " E para voltar, basta me chamar no whatsapp novamente!\n\n" +
          "*/Atendimento* - Fique por dentro dos nossos horários de atendimento.\n"+
          "-----\n\n" +
          "*/ - para re-exibir este menu de opções.*";
        client.sendText(message.from, aMSN);
        break;
      case "/CANAIS":
        aMSN =
          "*Minhas redes Sociais*\n" +
          "---------------------\n\n" +
          "▪️ *Instagram*\nhttps://www.instagram.com/festasdalu_/" +
          "\n\n▪️ *FaceBook*\nhttps://www.facebook.com/lucianamfer" +
          "\n\n▪️ *Youtube*\nhttps://www.youtube.com/channel/UCM67erhWa6HhOcwcm2Assmw" +
          "\n\nObrigada! \ndigite */* para visualizar o menu de opções.";
        client.sendText(message.from, aMSN);
        break;
      case "/PIX":
        aMSN =
          "-------------------------\n" +
          "*Dados do PIX:*\n" +
          "*Chave:* CPF 00999142399\n" +
          "*Nome:*  Luciana Maria Ferreira\n" +
          "-------------------------\n\n" +
          "Obrigada, agora aguardarei você me enviar a confirmação do pgto, assim que houver, iniciarei os trabalhos!";
        client.sendText(message.from, aMSN);
        break;
      case "/SAIR":
        aMSN =
          "Obrigada! Não irei te enviar mais esse tipo de conteúdo e " +
          "caso deseje retonar, \nbasta me chamar no whatsapp";
        client.sendText(message.from, aMSN);
        break;
      case "/ATENDIMENTO":
        aMSN =
          "*Horários*\n"+
          "--------\n\n"+
          "*Segunda* a *Sexta* das *7:30* as *21:30*\n"+
          "*Sabádos* e *Domingos*: Em alguns casos estou decorando, então deixe sua mensagem.\n\n"+
          "*Obrigada!*\n\n" +
          "Pela preferência, te responderei o mais breve possível.\n\n"+
          "-----\n\n" +
          "*/ - para re-exibir este menu de opções.*";
        client.sendText(message.from, aMSN);
        break;
      default:
        /**
         * Pesquisa no db...
         * se for primeira vez, exibe boas vindas.
         * senão, registra o contato em Control(collection)
         * expr != "undefined"
         * typeof profile != "undefined"
         **/
        // console.info(":::Valor de expr: ", expr);
        // console.info(":::Valor de !expr: ", !expr);

        if (expr) {
          try {
            let profile = await client.getNumberProfile(message.from);

            // console.info(":::: Valor de profile", profile);
            // console.info(":::: Valor de !profile", !profile);

            if (profile) {
              let usuario: String = profile.id.user;
              let wfound = await WhatsLead.find(
                { "profile.id.user": usuario },
                (err, data) => {
                  console.info("ERRO ::: DATA ::: LENGTH");
                  console.log(err, data, data.length);
                }
              );

              if (wfound.length == 0) {
                console.info(
                  "é o primeiro contato... de " +
                    usuario +
                    "message.from: " +
                    message.from
                );

                // TODO -"Para aqueles que estão recebendo a mensagem automática abaixo,
                //        é por motivos de testes que estou realizando em um projeto para a
                //        *FestasDaLu Decorações*, uma secretária eletrônica automatica para whatsapp!\n\n"
                // -----
                aMSN =
                  "Olá, sou a *Lu*, uma atendente virtual, irei te manter informada(a) com notícias relevantes. \n\n" +
                  "Sobre *Personalizados de Luxo*. Estamos próximas de uma data festiva?";
                  // "Se esse conteúdo não for do seu interesse, basta digitar */sair*, que não te enviarei mais. \n\n" +
                  "Se você lembrar de alguém que possa se interesar por essa oportunidade. *Por favor, compartilhe com ela!*\n\n" +
                  "Use */* para exibir nosso menu de opções!";
                client.sendText(message.from, aMSN);

                let docWhats = new WhatsLead({ profile });
                await docWhats.save();

                // await docWhats.save( (err, whatsleadId) => {
                //   console.info('Id do registro :')
                //   console.log(whatsleadId.id);
                // // });
                // console.log('#####################')
                // console.log(docWhats)
                break;
              } else {
                //TODO -Não é a primeira vez... Não vou gravar nada no DB, pois esse profile já consta lá!
                // console.log("Encontrado no DB o id: ");
                // console.log(usuario);
                // "Não é a primeira vez... Não vou gravar nada no DB, pois esse profile já consta lá!"
                aMSN =
                  ":::: Não é a primeira vez... Não vou gravar nada no DB, pois esse profile já consta lá!::::";
                console.info(aMSN);
                // client.sendText(message.from, aMSN);

                //TODO  Gerar uma outra collection para armazenar os dados do Control
                let idContato = wfound.map((s) => {
                  return s._id;
                });
                const doc = new Control({
                  WhatsLeadId: idContato,
                  status: expr == "/SAIR" ? "S" : "A",
                });
                await doc.save();

                //TODO  Conta qts conversas do mesmo número para sugerir ao contato a conhecer no SITE.
                let QtConversas = await Control.find({
                  WhatsLeadId: idContato,
                }).countDocuments();

                if (QtConversas == 3) {
                  aMSN =
                    "Venha conhecer *meu site*,\n*se inscreva* para receber novidades, \ncompartilhe com seus contatos, \nveja os cursos e produtos da FestaDaLu Decorações!\n\n" +
                    "link para o site aqui....." +
                    "\n\n*Use / para exibir nosso menu de opções!*";
                  client.sendText(message.from, aMSN);
                }
                if (QtConversas == 23) {
                  aMSN =
                    "Oi, já conhece *meu site*?\n Dê uma olhada e aproveita e *se inscreva* para receber novidades, \ncompartilhe com seus contatos, \nveja os cursos e produtos da FestaDaLu Decorações!\n\n" +
                    "link para o site aqui....." +
                    "\n\n*Use / para exibir nosso menu de opções!*";
                  client.sendText(message.from, aMSN);
                }
                break;
              }
            }
            break;
          } catch (error) {
            console.error("Ocorreu um Erro: " + error);
          }
        }
    }
    return;
  });
}
