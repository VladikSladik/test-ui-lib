import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ChakraProvider,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  SimpleGrid,
  Stack,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon, EmailIcon, HamburgerIcon } from "@chakra-ui/icons";

type Employee = {
  name: string;
  position: string;
  email: string;
  progress: number; // процент выполнения задач
  active: boolean;
};

const initialEmployees: Employee[] = [
  {
    name: "Иван Иванов",
    position: "Разработчик",
    email: "ivan@example.com",
    progress: 80,
    active: true,
  },
  {
    name: "Мария Смирнова",
    position: "Дизайнер",
    email: "maria@example.com",
    progress: 60,
    active: false,
  },
  {
    name: "Алексей Петров",
    position: "Менеджер",
    email: "alexey@example.com",
    progress: 50,
    active: true,
  },
];

export default function ChakraExample() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [form, setForm] = useState({ name: "", position: "", email: "" });
  const [errors, setErrors] = useState({
    name: false,
    position: false,
    email: false,
  });

  const sidebar = useDisclosure();
  const modal = useDisclosure();

  const validate = () => {
    const errs = {
      name: !form.name,
      position: !form.position,
      email: !form.email || !form.email.includes("@"),
    };
    setErrors(errs);
    return !Object.values(errs).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setEmployees([
        ...employees,
        {
          name: form.name,
          position: form.position,
          email: form.email,
          progress: Math.floor(Math.random() * 100),
          active: Math.random() > 0.5,
        },
      ]);
      setForm({ name: "", position: "", email: "" });
      modal.onClose();
    }
  };

  // Сайдбар
  const Sidebar = (
    <Box as="nav" bg="gray.100" w="full" h="100vh" p={4}>
      <Heading size="md" mb={6}>
        Меню
      </Heading>
      <Stack spacing={3}>
        <Button variant="ghost" onClick={sidebar.onClose}>
          Сотрудники
        </Button>
        <Button variant="ghost" leftIcon={<AddIcon />} onClick={modal.onOpen}>
          Добавить
        </Button>
        <Button variant="ghost" leftIcon={<EmailIcon />}>
          Почта
        </Button>
      </Stack>
      <Divider my={6} />
      <Text fontSize="sm" color="gray.500">
        © 2025 Компания
      </Text>
    </Box>
  );

  // Шапка
  const Header = (
    <Flex
      as="header"
      bg="white"
      align="center"
      justify="space-between"
      px={4}
      py={2}
      borderBottom="1px"
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex={1}
    >
      <IconButton
        aria-label="Открыть меню"
        icon={<HamburgerIcon />}
        display={{ base: "inline-flex", md: "none" }}
        onClick={sidebar.onOpen}
        variant="ghost"
        mr={2}
      />
      <Heading size="md" color="blue.600">
        Список сотрудников
      </Heading>
      <Flex align="center" gap={2}>
        <Avatar size="sm" name="Админ" />
        <Text fontSize="sm">admin@company.com</Text>
      </Flex>
    </Flex>
  );

  // Модалка для добавления сотрудника
  const AddEmployeeModal = (
    <Modal isOpen={modal.isOpen} onClose={modal.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавить сотрудника</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <Stack spacing={4}>
              <FormControl isInvalid={errors.name} isRequired>
                <FormLabel>Имя</FormLabel>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Введите имя"
                />
                {errors.name && (
                  <FormErrorMessage>Имя обязательно</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.position} isRequired>
                <FormLabel>Должность</FormLabel>
                <Input
                  value={form.position}
                  onChange={(e) =>
                    setForm({ ...form, position: e.target.value })
                  }
                  placeholder="Введите должность"
                />
                {errors.position && (
                  <FormErrorMessage>Должность обязательна</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.email} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Введите email"
                  type="email"
                />
                {errors.email && (
                  <FormErrorMessage>Введите корректный email</FormErrorMessage>
                )}
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Добавить
            </Button>
            <Button variant="ghost" onClick={modal.onClose}>
              Отмена
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );

  // Карточки сотрудников
  const EmployeeCards = (
    <Box mt={6}>
      <Heading size="sm" mb={3}>
        Карточки сотрудников
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {employees.map((emp, idx) => (
          <Card key={idx} borderWidth={1} borderRadius="lg" boxShadow="md">
            <CardHeader>
              <Flex align="center" gap={3}>
                <Avatar name={emp.name} />
                <Box>
                  <Text fontWeight="bold">{emp.name}</Text>
                  <Badge colorScheme={emp.active ? "green" : "red"}>
                    {emp.active ? "Активен" : "Неактивен"}
                  </Badge>
                </Box>
              </Flex>
            </CardHeader>
            <CardBody>
              <Text fontSize="sm" color="gray.600">
                {emp.position}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {emp.email}
              </Text>
              <Box mt={2}>
                <Text fontSize="xs" mb={1}>
                  Прогресс задач:
                </Text>
                <Progress
                  colorScheme="teal"
                  value={emp.progress}
                  borderRadius="md"
                />
                <Text fontSize="xs" color="gray.500" mt={1}>
                  {emp.progress}%
                </Text>
              </Box>
            </CardBody>
            <CardFooter>
              <Tag colorScheme={emp.progress > 70 ? "green" : "orange"}>
                {emp.progress > 70 ? "Отлично" : "В процессе"}
              </Tag>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );

  // Таблица сотрудников
  const EmployeeTable = (
    <Box mt={10}>
      <Heading size="sm" mb={3}>
        Таблица сотрудников
      </Heading>
      <Table variant="simple" bg="white" borderRadius="md" boxShadow="sm">
        <Thead>
          <Tr>
            <Th>Имя</Th>
            <Th>Должность</Th>
            <Th>Email</Th>
            <Th>Активность</Th>
            <Th>Прогресс</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees.map((emp, idx) => (
            <Tr key={idx}>
              <Td>
                <Flex align="center" gap={2}>
                  <Avatar name={emp.name} size="xs" />
                  <Text>{emp.name}</Text>
                </Flex>
              </Td>
              <Td>{emp.position}</Td>
              <Td>
                <Tag colorScheme="blue">{emp.email}</Tag>
              </Td>
              <Td>
                <Badge colorScheme={emp.active ? "green" : "red"}>
                  {emp.active ? "Да" : "Нет"}
                </Badge>
              </Td>
              <Td>
                <Progress
                  value={emp.progress}
                  size="sm"
                  colorScheme="teal"
                  borderRadius="md"
                />
                <Text fontSize="xs">{emp.progress}%</Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );

  // Alert пример
  const EmployeesAlert = employees.length < 3 && (
    <Alert status="warning" borderRadius="md" mb={4}>
      <AlertIcon />
      Мало сотрудников в компании! Добавьте новых.
    </Alert>
  );

  return (
    <ChakraProvider>
      {/* Мобильный сайдбар */}
      <Drawer
        isOpen={sidebar.isOpen}
        placement="left"
        onClose={sidebar.onClose}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Меню</DrawerHeader>
          <DrawerBody>{Sidebar}</DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Десктоп сайдбар */}
      <Box
        display={{ base: "none", md: "block" }}
        position="fixed"
        left={0}
        top={0}
        h="100vh"
        w="60"
      >
        {Sidebar}
      </Box>

      {/* Основной контент */}
      <Box ml={{ base: 0, md: 60 }} minH="100vh" bg="gray.50">
        {Header}
        <Box maxW="container.lg" mx="auto" py={8} px={4}>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="teal"
            mb={6}
            onClick={modal.onOpen}
          >
            Добавить сотрудника
          </Button>

          {EmployeesAlert}

          {/* Карточки сотрудников */}
          {EmployeeCards}

          {/* Таблица сотрудников */}
          {EmployeeTable}
        </Box>
      </Box>

      {AddEmployeeModal}
    </ChakraProvider>
  );
}
