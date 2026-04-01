import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Image,
  Button,
  Spinner,
  Select,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { getUser, getRepos } from "../services/github";
import { useTranslation } from "react-i18next";

function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("created");

  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleSearch = () => {
    if (!search) return;
    navigate(`/profile/${search}`);
    window.location.reload();
  };

  useEffect(() => {
    fetchUser();
  }, [username]);

  useEffect(() => {
    setPage(1);
    setRepos([]);
    setHasMore(true);
  }, [username, sort]);

  useEffect(() => {
    fetchRepos(page, sort);
  }, [page, sort, username]);

  const fetchUser = async () => {
    try {
      setError("");

      const data = await getUser(username);

      if (data.message === "Not Found") {
        setError(t("userNotFound"));
        setUser(null);
        return;
      }

      setUser(data);
    } catch {
      setError(t("userNotFound"));
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchRepos = async (pageNumber, sortType) => {
    if (!hasMore && pageNumber !== 1) return;

    try {
      setLoadingMore(true);
      const data = await getRepos(username, pageNumber, sortType);

      if (pageNumber === 1) {
        setRepos(data);
      } else {
        setRepos((prev) => [...prev, ...data]);
      }

      if (data.length === 0) setHasMore(false);
    } catch {
      console.log("Erro repos");
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (loadingMore || !hasMore) return;

      const bottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100;

      if (bottom) setPage((prev) => prev + 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, hasMore]);

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  if (loading) {
    return (
      <Box textAlign="center" mt="100px">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={{ base: 4, md: 6 }}>
      {/* HEADER */}
      <Flex
        justify="space-between"
        align="center"
        mb={8}
        flexDirection={{ base: "column", md: "row" }}
        gap={4}
      >
        <Text fontSize="2xl" fontWeight="bold">
          <span style={{ color: "#2B6CB0" }}>
            {t("searchWord")}{" "}
          </span>
          <span style={{ color: "#805AD5" }}>d_evs</span>
        </Text>

        {/* BUSCA */}
        <InputGroup width={{ base: "100%", md: "300px" }}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>

          <Input
            placeholder={t("placeholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
        </InputGroup>

        {/* IDIOMA */}
        <Button
          onClick={() =>
            i18n.changeLanguage(i18n.language === "pt" ? "en" : "pt")
          }
        >
          {i18n.language.toUpperCase()}
        </Button>
      </Flex>

      {/* ERRO */}
      {error && (
        <Box textAlign="center" width="100%" mb={6}>
          <Text color="red.500" fontSize="lg">
            {error}
          </Text>
        </Box>
      )}

      {/* LAYOUT */}
      <Flex
        gap={6}
        align="flex-start"
        flexWrap="wrap"
        flexDirection={{ base: "column", md: "row" }}
      >
        {/* PERFIL */}
        <Box
          width={{ base: "100%", md: "260px" }}
          p={5}
          border="1px solid #eee"
          borderRadius="12px"
          boxShadow="md"
        >
          {user && (
            <>
              <Image
                src={user.avatar_url}
                borderRadius="full"
                width="100px"
                mx="auto"
                mb={4}
              />

              <Text textAlign="center" fontWeight="bold">
                {user.name}
              </Text>

              <Text textAlign="center" color="gray.500">
                @{user.login}
              </Text>

              <Text mt={4} fontSize="sm">
                {user.bio || t("noBio")}
              </Text>

              {user.blog && (
                <Button
                  mt={3}
                  width="100%"
                  as="a"
                  href={
                    user.blog.startsWith("http")
                      ? user.blog
                      : `https://${user.blog}`
                  }
                  target="_blank"
                >
                  {t("website")}
                </Button>
              )}

              {user.twitter_username && (
                <Button
                  mt={2}
                  width="100%"
                  as="a"
                  href={`https://twitter.com/${user.twitter_username}`}
                  target="_blank"
                >
                  {t("twitter")}
                </Button>
              )}
            </>
          )}

          <Button mt={5} width="100%" colorScheme="purple">
            {t("contact")}
          </Button>
        </Box>

        {/* REPOS */}
        <Box flex="1" width="100%">
          <Select
            mb={4}
            maxW={{ base: "100%", md: "220px" }}
            value={sort}
            onChange={handleSortChange}
          >
            <option value="created">{t("sort_created")}</option>
            <option value="updated">{t("sort_updated")}</option>
            <option value="pushed">{t("sort_pushed")}</option>
            <option value="full_name">{t("sort_name")}</option>
          </Select>

          {repos.map((repo) => (
            <Box
              key={repo.id}
              p={4}
              mb={3}
              border="1px solid #eee"
              borderRadius="10px"
              boxShadow="sm"
            >
              <a href={repo.html_url} target="_blank">
                <Text fontWeight="bold">{repo.name}</Text>
              </a>

              <Text fontSize="sm" color="gray.500">
                {repo.description}
              </Text>
            </Box>
          ))}

          {loadingMore && (
            <Box textAlign="center" mt={4}>
              <Spinner />
            </Box>
          )}

          {!hasMore && (
            <Text textAlign="center" mt={4} color="gray.500">
              {t("noMore")}
            </Text>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export default Profile;