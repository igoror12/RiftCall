import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import appConfig from "../config.json";

function Titulo(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals["000"]};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

// Componente React
// function HomePage() {
//     // JSX
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h2">Boas vindas de volta!</Titulo>
//             <h2>Discord - Alura Matrix</h2>
//         </div>
//     )
// }
// export default HomePage

export default function PaginaInicial() {
  //const username = "igoror12";
  //Variaveis para receber a entrada do Usuário:
  const [username, setUsername] = React.useState("");
  const roteamento = useRouter();

  //VAriavel p/ receber a resposta da API Rest de Dados do Usuário GITHUB:
  const [dataUsuario, setDataUsuario] = useState({});

  //Precisamos buscar os dados do usuário, toda vez que houver uma atualizacao no "username";
  //vamos usar um hook useEffect do React.
  useEffect(() => {
    getDataUsuario();
  }, [username]);

  var gitHubUrl = `https://api.github.com/users/${username}`;

  // Agora para obter a resposta da API de usuários do GitHub, vamos fazer uma requisição GET usando Fetch,
  //que será o papel da função getUserData().
  //getUserData() é uma função assíncrona , na qual fetch(gitHubUrl) faz a solicitação e retorna uma promessa.
  //Quando a solicitação for concluída, a promessa será resolvida com o objeto de resposta .
  //Esse objeto é basicamente um placeholder genérico para vários formatos de resposta.
  const getDataUsuario = async () => {
    const response = await fetch(gitHubUrl);
    //response.json() é usado para extrair o objeto JSON da resposta, ele retorna uma promessa, daí o await.
    const jsonData = await response.json();
    if (jsonData && jsonData.message != "Not Found") {
      setDataUsuario(jsonData);
      console.log(jsonData);
    } else if (username !== "") {
      console.log("Username does not exist");
    } else {
      setDataUsuario({});
    }
  };

  //console.log(roteamento);
  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2012/04/14/16/37/sky-34536_960_720.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "70%",
            maxWidth: "600px",
            borderRadius: "10px",
            padding: "24px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: appConfig.theme.colors.neutrals[500],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Alguem submeteu o form");
              roteamento.push({
                pathname: "/chat",
                //window.location.href = '/chat';
              });
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Titulo tag="h2">Bem-Vindo(a)!!</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "24px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              placeholder="igoror12"
              onChange={function (event) {
                console.log("usuario digitou:", event.target.value);
                //Onde está o valo?
                const valor = event.target.value;
                //Trocar o valor da variavel
                // Através do REact e avise quem precisa
                setUsername(valor);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["#FFFFF"],
                mainColor: appConfig.theme.colors.primary["000"],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.neutrals[1000],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "10px",
              backgroundColor: appConfig.theme.colors.neutrals["000"],
              border: "5px solid",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                border: `9px solid ${appConfig.theme.colors.neutrals[500]}`,
                borderRadius: "50%",
                marginBottom: "16px",
              }}
              src={`${
                username.length <= 2
                  ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  : `https://github.com/${username}.png`
              }`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "2px 2px",
                borderRadius: "1000px",
              }}
            >
              {username.length <= 2 ? "Usuário_none" : `@${username}`}
            </Text>
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals["200"],
                backgroundColor: appConfig.theme.colors.neutrals["900"],
                padding: "2px 30px",
                borderRadius: "1000px",
                marginTop: "5px",
                width: "50px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >{dataUsuario.location}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
