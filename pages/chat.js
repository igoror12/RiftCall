import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";

export default function ChatPage() {
  // Sua lógica vai aqui

  // ./Sua lógica vai aqui
  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://cdn.pixabay.com/photo/2012/04/14/16/37/sky-34536_960_720.png)`,
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
          maxWidth: "75%",
          maxHeight: "75vh",
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
            backgroundColor: appConfig.theme.colors.neutrals[200],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          {/* <MessageList mensagens={[]} /> */}

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              placeholder="Digite aqui..."
              type="textarea"
              styleSheet={{
                display: "flex",
                flexDirection:"column",
                justifyContent:"flex-end",
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[600],
                marginRight: "12px",
                color: appConfig.theme.colors.primary[50],
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
          marginBottom: "16px",
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
  console.log("MessageList", props);
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
      <Text
        key={mensagem.id}
        tag="li"
        styleSheet={{
          borderRadius: "5px",
          padding: "6px",
          marginBottom: "12px",
          hover: {
            backgroundColor: appConfig.theme.colors.neutrals[700],
          },
        }}
      >
        <Box
          styleSheet={{
            marginBottom: "8px",
          }}
        >
          <Image
            styleSheet={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              display: "inline-block",
              marginRight: "8px",
            }}
            src={`https://github.com/vanessametonini.png`}
          />
          <Text tag="strong">{mensagem.de}</Text>
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
        {mensagem.texto}
      </Text>
    </Box>
  );
}
