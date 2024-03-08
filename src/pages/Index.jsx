import React, { useState } from "react";
import { Box, Flex, Heading, Input, Button, useColorMode, IconButton, VStack, HStack, Textarea, Text, useToast } from "@chakra-ui/react";
import { FaPlus, FaMoon, FaSun, FaTrash } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const handleAddNote = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Empty note",
        description: "Can't add an empty note.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setNotes((prevNotes) => [...prevNotes, inputValue]);
    setInputValue("");
  };

  const handleDeleteNote = (index) => {
    setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
  };

  return (
    <Box p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading>Note Keeper</Heading>
        <IconButton icon={colorMode === "light" ? <FaMoon /> : <FaSun />} onClick={toggleColorMode} isRound />
      </Flex>
      <VStack spacing={4}>
        <HStack width="100%">
          <Textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Type your note here..." size="sm" resize="none" />
          <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddNote}>
            Add Note
          </Button>
        </HStack>
        {notes.map((note, index) => (
          <Flex key={index} p={3} shadow="md" borderWidth="1px" borderRadius="md" width="100%" justifyContent="space-between" alignItems="center">
            <Text>{note}</Text>
            <IconButton icon={<FaTrash />} onClick={() => handleDeleteNote(index)} isRound size="sm" variant="ghost" colorScheme="red" />
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;
