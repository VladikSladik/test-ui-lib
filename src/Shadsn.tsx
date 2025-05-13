// App.tsx

import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Типы
interface Employee {
    id: number;
    name: string;
    position: string;
    email: string;
    progress: number;
}

const initialEmployees: Employee[] = [
    { id: 1, name: "Иван Петров", position: "Разработчик", email: "ipetrov@example.com", progress: 80 },
    { id: 2, name: "Мария Сидорова", position: "Дизайнер", email: "msidorova@example.com", progress: 65 },
    { id: 3, name: "Алексей Иванов", position: "Менеджер", email: "aivanov@example.com", progress: 90 },
];

// --- Сайдбар ---
const Sidebar: React.FC<{ current: number; setCurrent: (idx: number) => void }> = ({ current, setCurrent }) => (
    <aside className="h-screen w-56 bg-muted flex flex-col border-r">
        <div className="h-16 flex items-center justify-center font-bold text-lg border-b">Компания</div>
        <nav className="flex-1 py-4">
            <ul className="space-y-2">
                <li>
                    <Button
                        variant={current === 0 ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setCurrent(0)}
                    >
                        Сотрудники
                    </Button>
                </li>
                <li>
                    <Button
                        variant={current === 1 ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setCurrent(1)}
                    >
                        Отчёты
                    </Button>
                </li>
            </ul>
        </nav>
    </aside>
);

// --- Таблица сотрудников ---
const EmployeeTable: React.FC<{ employees: Employee[] }> = ({ employees }) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>ФИО</TableHead>
                <TableHead>Должность</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Прогресс</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {employees.map(emp => (
                <TableRow key={emp.id}>
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                {emp.name.charAt(0)}
                            </div>
                            {emp.name}
                        </div>
                    </TableCell>
                    <TableCell>{emp.position}</TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>
                        <div className="w-32 bg-muted rounded-full h-3">
                            <div
                                className="bg-primary h-3 rounded-full"
                                style={{ width: `${emp.progress}%` }}
                            />
                        </div>
                        <span className="text-xs text-muted-foreground ml-2">{emp.progress}%</span>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

// --- Карточки сотрудников ---
const EmployeeCards: React.FC<{ employees: Employee[] }> = ({ employees }) => (
    <div className="flex flex-wrap gap-4">
        {employees.map(emp => (
            <Card key={emp.id} className="w-72">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                            {emp.name.charAt(0)}
                        </div>
                        <div>
                            <CardTitle className="text-base">{emp.name}</CardTitle>
                            <CardDescription>{emp.position}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-sm mb-2">{emp.email}</div>
                    <div>
                        <div className="w-full bg-muted rounded-full h-3 mb-1">
                            <div
                                className="bg-primary h-3 rounded-full"
                                style={{ width: `${emp.progress}%` }}
                            />
                        </div>
                        <span className="text-xs text-muted-foreground">{emp.progress}%</span>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
);

// --- Модальное окно с формой ---
const AddEmployeeDialog: React.FC<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAdd: (employee: Employee) => void;
}> = ({ open, onOpenChange, onAdd }) => {
    const [form, setForm] = useState<Omit<Employee, "id">>({
        name: "",
        position: "",
        email: "",
        progress: 0,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === "progress" ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({ ...form, id: Date.now() });
        setForm({ name: "", position: "", email: "", progress: 0 });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Добавить сотрудника</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="name">ФИО</Label>
                        <Input id="name" name="name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="position">Должность</Label>
                        <Input id="position" name="position" value={form.position} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" value={form.email} onChange={handleChange} required type="email" />
                    </div>
                    <div>
                        <Label htmlFor="progress">Прогресс (%)</Label>
                        <Input id="progress" name="progress" value={form.progress} onChange={handleChange} required type="number" min={0} max={100} />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Отмена
                        </Button>
                        <Button type="submit">Добавить</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

// --- Главная страница сотрудников ---
const EmployeesPage: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
    const [view, setView] = useState<"table" | "cards">("table");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [alert, setAlert] = useState(false);
    const [filter, setFilter] = useState<string>("all");

    const handleAddEmployee = (emp: Employee) => {
        setEmployees(prev => [...prev, emp]);
        setAlert(true);
    };

    const filteredEmployees = filter === "all"
        ? employees
        : employees.filter(e => e.position === filter);

    return (
        <div>
            <div className="flex flex-wrap gap-2 items-center mb-4">
                <Button
                    variant={view === "table" ? "default" : "outline"}
                    onClick={() => setView("table")}
                >
                    Таблица
                </Button>
                <Button
                    variant={view === "cards" ? "default" : "outline"}
                    onClick={() => setView("cards")}
                >
                    Карточки
                </Button>
                <Select
                    value={filter}
                    onValueChange={setFilter}
                >
                    <SelectTrigger className="w-44">
                        <SelectValue placeholder="Все должности" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Все должности</SelectItem>
                        {Array.from(new Set(employees.map(e => e.position))).map(pos => (
                            <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={() => setDialogOpen(true)}>Добавить сотрудника</Button>
            </div>
            {alert && (
                <Alert variant="default" className="mb-4" onClick={() => setAlert(false)}>
                    <AlertTitle>Успех!</AlertTitle>
                    <AlertDescription>Сотрудник добавлен.</AlertDescription>
                </Alert>
            )}
            {view === "table" ? (
                <EmployeeTable employees={filteredEmployees} />
            ) : (
                <EmployeeCards employees={filteredEmployees} />
            )}
            <AddEmployeeDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onAdd={handleAddEmployee}
            />
        </div>
    );
};

const Shadcn: React.FC = () => {
    const [page, setPage] = useState(0);

    return (
        <div className="flex min-h-screen">
            <Sidebar current={page} setCurrent={setPage} />
            <main className="flex-1 p-8 bg-background">
                {page === 0 && <EmployeesPage />}
                {page === 1 && (
                    <div className="text-2xl font-bold">Раздел «Отчёты» (заглушка)</div>
                )}
            </main>
        </div>
    );
};

export default Shadcn;
