import React, { useState } from "react";
import {
    Sidebar,
    SidebarItems,
    SidebarItemGroup,
    SidebarItem,
    SidebarLogo,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Label,
    TextInput,
    FileInput,
    ToggleSwitch,
    Badge,
    Avatar,
} from "flowbite-react";
import {
    HiChartPie,
    HiUser,
    HiInbox,
    HiShoppingBag,
    HiTable,
    HiArrowSmRight,
    HiViewBoards,
    HiPlus,
} from "react-icons/hi";

type Employee = {
    id: number;
    name: string;
    email: string;
    salary: number;
    avatar?: string;
    active: boolean;
};

const initialEmployees: Employee[] = [
    {
        id: 1,
        name: "Neil Sims",
        email: "neil@flowbite.com",
        salary: 320,
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        active: true,
    },
    {
        id: 2,
        name: "Bonnie Green",
        email: "bonnie@flowbite.com",
        salary: 3467,
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        active: true,
    },
    {
        id: 3,
        name: "Michael Gough",
        email: "michael@flowbite.com",
        salary: 67,
        avatar: "https://randomuser.me/api/portraits/men/65.jpg",
        active: false,
    },
];

export default function App() {
    const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
    const [showModal, setShowModal] = useState(false);

    // Форма добавления сотрудника
    const [form, setForm] = useState({
        name: "",
        email: "",
        salary: "",
        active: true,
        avatar: "",
    });

    // Обработка формы
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type, checked } = e.target as any;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm((prev) => ({
                ...prev,
                avatar: URL.createObjectURL(file),
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setEmployees((prev) => [
            ...prev,
            {
                id: Date.now(),
                name: form.name,
                email: form.email,
                salary: Number(form.salary),
                avatar: form.avatar || undefined,
                active: form.active,
            },
        ]);
        setForm({ name: "", email: "", salary: "", active: true, avatar: "" });
        setShowModal(false);
    };

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Сайдбар */}
            <Sidebar aria-label="Sidebar with logo branding example" className="w-64">
                <SidebarLogo
                    href="#"
                    img="https://flowbite.com/docs/images/logo.svg"
                    imgAlt="Flowbite logo"
                >
                    Flowbite HR
                </SidebarLogo>
                <SidebarItems>
                    <SidebarItemGroup>
                        <SidebarItem href="#" icon={HiChartPie}>
                            Dashboard
                        </SidebarItem>
                        <SidebarItem href="#" icon={HiViewBoards} label="Pro" labelColor="dark">
                            Kanban
                        </SidebarItem>
                        <SidebarItem href="#" icon={HiInbox} label="3">
                            Inbox
                        </SidebarItem>
                        <SidebarItem href="#" icon={HiUser}>
                            Employees
                        </SidebarItem>
                        <SidebarItem href="#" icon={HiShoppingBag}>
                            Products
                        </SidebarItem>
                        <SidebarItem href="#" icon={HiArrowSmRight}>
                            Sign In
                        </SidebarItem>
                        <SidebarItem href="#" icon={HiTable}>
                            Sign Up
                        </SidebarItem>
                    </SidebarItemGroup>
                </SidebarItems>
                <div className="p-4">
                    <Button color="success" onClick={() => setShowModal(true)} fullSized>
                        <HiPlus className="mr-2 h-5 w-5" />
                        Добавить сотрудника
                    </Button>
                </div>
            </Sidebar>

            {/* Основной контент */}
            <div className="flex-1 flex flex-col">
                {/* Шапка */}
                <Navbar fluid className="bg-white border-b dark:bg-gray-800">
                    <NavbarBrand href="#">
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="mr-3 h-6 sm:h-9"
                            alt="Flowbite Logo"
                        />
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Flowbite HR
            </span>
                    </NavbarBrand>
                    <NavbarCollapse>
                        <NavbarLink href="#" active>
                            Сотрудники
                        </NavbarLink>
                        <NavbarLink href="#">Отчеты</NavbarLink>
                        <NavbarLink href="#">Профиль</NavbarLink>
                    </NavbarCollapse>
                </Navbar>

                {/* Список сотрудников */}
                <main className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                        Список сотрудников
                    </h2>
                    <ul className="max-w-2xl divide-y divide-gray-200 dark:divide-gray-700">
                        {employees.map((emp) => (
                            <li key={emp.id} className="py-4">
                                <div className="flex items-center space-x-4">
                                    <Avatar
                                        img={emp.avatar}
                                        rounded
                                        status={emp.active ? "online" : "offline"}
                                        statusPosition="bottom-right"
                                        alt={emp.name}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {emp.name}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {emp.email}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        {emp.salary} ₽
                                    </div>
                                    <Badge color={emp.active ? "success" : "failure"} className="ml-2">
                                        {emp.active ? "Активен" : "Неактивен"}
                                    </Badge>
                                </div>
                            </li>
                        ))}
                    </ul>
                </main>
            </div>

            {/* Модалка добавления сотрудника */}
            <Modal show={showModal} onClose={() => setShowModal(false)} size="md">
                <ModalHeader>Добавить сотрудника</ModalHeader>
                <ModalBody>
                    <form className="flex  flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="name">Имя</Label>
                            <TextInput
                                id="name"
                                name="name"
                                placeholder="Иван Иванов"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <TextInput
                                id="email"
                                name="email"
                                type="email"
                                placeholder="user@example.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="salary">Зарплата (₽)</Label>
                            <TextInput
                                id="salary"
                                name="salary"
                                type="number"
                                min="0"
                                placeholder="1000"
                                value={form.salary}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="avatar">Аватар (необязательно)</Label>
                            <FileInput id="avatar" name="avatar" onChange={handleFile} />
                        </div>
                        <div className="flex items-center gap-2">
                            <ToggleSwitch
                                checked={form.active}
                                label="Активен"
                                onChange={(checked) =>
                                    setForm((prev) => ({ ...prev, active: checked }))
                                }
                            />
                        </div>
                        <Button type="submit" color="primary">
                            Добавить
                        </Button>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="gray" onClick={() => setShowModal(false)}>
                        Отмена
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
