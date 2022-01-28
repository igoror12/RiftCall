import {Box,Text,TextField,Image,Button,Icon,} from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { imageConfigDefault } from "next/dist/server/image-config";


const SUPABE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM3MzI4NywiZXhwIjoxOTU4OTQ5Mjg3fQ._4IEl9OASIzGRNIYG4iG_-PQoqtkX2zcOFAhy7nEuVA";
const SUPABASE_URL = "https://srwsozdorcqhlcuwosuu.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABE_ANON_KEY);


export default function ChatPage() {
  const [mensagem, setMensagem] = React.useState("");
  const [chat, setChat] = React.useState([]);
  
  React.useEffect(() => {
    supabaseClient
      .from('Mensagens')
      .select('*')
      .order('id', {ascending: false})
      .then(({data}) => {
        console.log("Dados: ",data);
        setChat(data);
      });
  }, []);

  /*
    // Usuário
    - Usuário digita no campo textarea
    - Aperta enter para enviar
    - Tem que adicionar o texto na listagem
    
    // Dev
    - [X] Campo criado
    - [X] Vamos usar o onChange usa o useState (ter if pra caso seja enter pra limpar a variavel)
    - [X] Lista de mensagens 
    */
  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      id: chat.length + 1,
      de: "igoror12",
      texto: novaMensagem,
    };

    supabaseClient
      .from('Mensagens')
      .insert([
        //Tem que ser um objeto com os MESMOS CAMPOS QUE VOCE ESCREVEU NO SUPABASE
        mensagem
      ])
      .then(({data}) => {
        console.log('criando mensagem:'. data);
        setChat([
          data[0],
          ...chat
        ]);
      });

    setMensagem("");
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[1000],
        backgroundImage:
          "url(https://cdn.pixabay.com/photo/2012/04/14/16/37/sky-34536_960_720.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[500],
          height: "100%",
          maxWidth: "80%",
          maxHeight: "95vh",
          padding: "24px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[400],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList mensagens={chat} handleDelete={(id) => {
                        setChat(
                            chat.filter((msg) => {
                                return msg.id != id;
                            })
                        );
                      }} />
          {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                const valor = event.target.value;
                setMensagem(valor);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNovaMensagem(mensagem);
                  notificacao(event);
                }
              }}
              placeholder="Digite aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "16px",
                color: appConfig.theme.colors.neutrals["000"],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  console.log(props);
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => {
                return (

                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            display: "flex",
                            justifyContent: "space-between",

                            borderRadius: "5px",
                            padding: "6px",
                            marginBottom: "12px",
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[500],
                            },
                        }}
                    >
                        <Box
                            styleSheet={{
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: "8px",
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                    marginRight: "8px",
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Box
                                styleSheet={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Box
                                    styleSheet={{
                                        marginRight: "10px",
                                        marginBottom: "5px",
                                    }}
                                >
                                    <Text
                                        tag="strong"
                                        styleSheet={{
                                            fontWeight: "bold",
                                            color: appConfig.theme.colors.primary[200],
                                        }}
                                    >
                                        {mensagem.de}
                                    </Text>
                                    <Text
                                        styleSheet={{
                                            fontSize: "10px",
                                            marginLeft: "8px",
                                            color: appConfig.theme.colors.neutrals[300],
                                        }}
                                        tag="span"
                                    >
                                        {new Date().toLocaleDateString()}
                                    </Text>
                                </Box>
                                <Text
                                    styleSheet={{
                                        fontFamily:"Inconsolata, monospace",
                                        width: "100%",
                                        wordBreak: "break-all",
                                    }}
                                    tag="p"
                                >
                                    {mensagem.texto}
                                </Text>
                            </Box>
                        </Box>
                        <Box>
                            <Button
                                onClick={() => {
                                    props.handleDelete(mensagem.id);
                                }}
                                label="X"
                                variant="tertiary"
                                size="xs"
                                styleSheet={{
                                    height: "20px",
                                    width: "20px",
                                    padding: "0",
                                }}
                                buttonColors={{
                                    contrastColor: "#FFFFFF",
                                    mainColor: appConfig.theme.colors.neutrals[800],
                                    mainColorLight: appConfig.theme.colors.neutrals[500],
                                    mainColorStrong: appConfig.theme.colors.neutrals[100],
                                }}
                            />
                        </Box>
                    </Text>
                );
            })}


        </Box>
    )
}