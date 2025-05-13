import React, { ChangeEvent, FC, useState } from "react";
import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import TableChartIcon from "@mui/icons-material/TableChart";
import AddIcon from "@mui/icons-material/Add";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";

const drawerWidth = 220;

// Тип для сотрудника
interface Employee {
  id: number;
  name: string;
  position: string;
  email: string;
  avatar?: string;
  progress: number;
}

// Типы пропсов для компонентов
interface SidebarProps {
  current: number;
  setCurrent: (idx: number) => void;
}

interface EmployeeTableProps {
  employees: Employee[];
}

interface EmployeeCardsProps {
  employees: Employee[];
}

interface AddEmployeeDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (employee: Employee) => void;
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "Иван Петров",
    position: "Разработчик",
    email: "ipetrov@example.com",
    avatar: "",
    progress: 80,
  },
  {
    id: 2,
    name: "Мария Сидорова",
    position: "Дизайнер",
    email: "msidorova@example.com",
    avatar: "",
    progress: 65,
  },
  {
    id: 3,
    name: "Алексей Иванов",
    position: "Менеджер",
    email: "aivanov@example.com",
    avatar: "",
    progress: 90,
  },
];

const Sidebar: FC<SidebarProps> = ({ current, setCurrent }) => (
  <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
    }}
  >
    <Toolbar />
    <Box sx={{ overflow: "auto" }}>
      <List>
        <ListItem button selected={current === 0} onClick={() => setCurrent(0)}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Сотрудники" />
        </ListItem>
        <ListItem button selected={current === 1} onClick={() => setCurrent(1)}>
          <ListItemIcon>
            <TableChartIcon />
          </ListItemIcon>
          <ListItemText primary="Отчёты" />
        </ListItem>
      </List>
    </Box>
  </Drawer>
);

const EmployeeTable: FC<EmployeeTableProps> = ({ employees }) => (
  <Box sx={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Аватар</th>
          <th>ФИО</th>
          <th>Должность</th>
          <th>Email</th>
          <th>Прогресс</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>
              <Avatar>{emp.name.charAt(0)}</Avatar>
            </td>
            <td>{emp.name}</td>
            <td>{emp.position}</td>
            <td>{emp.email}</td>
            <td>
              <Box sx={{ minWidth: 120 }}>
                <LinearProgress
                  variant="determinate"
                  value={emp.progress}
                  sx={{ height: 8, borderRadius: 5 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {emp.progress}%
                </Typography>
              </Box>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Box>
);

const EmployeeCards: FC<EmployeeCardsProps> = ({ employees }) => (
  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
    {employees.map((emp) => (
      <Card key={emp.id} sx={{ width: 280 }}>
        <CardHeader
          avatar={<Avatar>{emp.name.charAt(0)}</Avatar>}
          title={emp.name}
          subheader={emp.position}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {emp.email}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption">Прогресс</Typography>
            <LinearProgress
              variant="determinate"
              value={emp.progress}
              sx={{ height: 8, borderRadius: 5 }}
            />
          </Box>
        </CardContent>
      </Card>
    ))}
  </Box>
);

const AddEmployeeDialog: FC<AddEmployeeDialogProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [form, setForm] = useState<Omit<Employee, "id" | "avatar">>({
    name: "",
    position: "",
    email: "",
    progress: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "progress" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    onAdd({ ...form, id: Date.now(), avatar: "" });
    setForm({ name: "", position: "", email: "", progress: 0 });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Добавить сотрудника</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="ФИО"
          name="name"
          fullWidth
          variant="standard"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Должность"
          name="position"
          fullWidth
          variant="standard"
          value={form.position}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          fullWidth
          variant="standard"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Прогресс (%)"
          name="progress"
          type="number"
          fullWidth
          variant="standard"
          value={form.progress}
          onChange={handleChange}
          inputProps={{ min: 0, max: 100 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained">
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const EmployeesPage: FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [view, setView] = useState<"table" | "cards">("table");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [filter, setFilter] = useState<string>("");

  const handleAddEmployee = (emp: Employee) => {
    setEmployees((prev) => [...prev, emp]);
    setAlertOpen(true);
  };

  const filteredEmployees = filter
    ? employees.filter((e) => e.position === filter)
    : employees;

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Tabs value={view} onChange={(_, v) => setView(v)} sx={{ mr: 2 }}>
          <Tab value="table" icon={<ViewListIcon />} label="Таблица" />
          <Tab value="cards" icon={<ViewModuleIcon />} label="Карточки" />
        </Tabs>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          displayEmpty
          sx={{ minWidth: 140, mr: 2 }}
        >
          <MenuItem value="">Все должности</MenuItem>
          {[...new Set(employees.map((e) => e.position))].map((pos) => (
            <MenuItem key={pos} value={pos}>
              {pos}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Добавить
        </Button>
      </Box>
      {view === "table" ? (
        <EmployeeTable employees={filteredEmployees} />
      ) : (
        <EmployeeCards employees={filteredEmployees} />
      )}
      <AddEmployeeDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAdd={handleAddEmployee}
      />
      <Snackbar
        open={alertOpen}
        autoHideDuration={2000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Сотрудник успешно добавлен!
        </Alert>
      </Snackbar>
    </Box>
  );
};

const Material: FC = () => {
  const [page, setPage] = useState<number>(0);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Пример интерфейса на MUI
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar current={page} setCurrent={setPage} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {page === 0 && <EmployeesPage />}
        {page === 1 && (
          <Typography variant="h4">Раздел «Отчёты» (заглушка)</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Material;
