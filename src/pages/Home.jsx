import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Input,
  Button,
  Flex,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { getUser } from "../services/github";

function Home() {
  const [username, setUsername] = useState("");
  const [errorKey, setErrorKey] = useState("");

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleSearch = async () => {
    if (!username) {
      setErrorKey("emptySearch");
      return;
    }

    try {
      setErrorKey("");

      const data = await getUser(username);

      if (data.message === "Not Found") {
        setErrorKey("userNotFound");
        return;
      }

      navigate(`/profile/${username}`);
    } catch {
      setErrorKey("userNotFound");
    }
  };

  return (
    <Flex
      height="100vh"
      align="center"
      justify="center"
      direction="column"
      bg="gray.50"
    >
      {/* idioma */}
      <Box position="absolute" top="20px" right="20px">
        <Button
          size="sm"
          onClick={() =>
            i18n.changeLanguage(i18n.language === "pt" ? "en" : "pt")
          }
        >
          {i18n.language.toUpperCase()}
        </Button>
      </Box>

      {/* logo */}
      <Text fontSize="4xl" fontWeight="bold" mb={8}>
        <span style={{ color: "#2B6CB0" }}>{t("searchWord")} </span>
        <span style={{ color: "#805AD5" }}>d_evs</span>
      </Text>

      {/* busca */}
      <Flex direction="column" align="center" gap={3}>
        <Flex gap={3}>
          <InputGroup width="300px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>

            <Input
              placeholder={t("placeholder")}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrorKey("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
          </InputGroup>

          <Button colorScheme="purple" onClick={handleSearch}>
            {t("search")}
          </Button>
        </Flex>

        {/* erro */}
        {errorKey && (
          <Text color="red.500">{t(errorKey)}</Text>
        )}
      </Flex>
    </Flex>
  );
}

export default Home;