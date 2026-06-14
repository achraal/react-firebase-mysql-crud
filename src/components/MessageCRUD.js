import { useEffect, useState } from "react";
import {
  Container, Typography, TextField, Button,
  Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, Paper
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const API = "http://localhost:5000/api/messages";

export default function MessageCRUD() {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ _id: null, name: "", message: "" });

  // READ
  const loadMessages = () => {
    fetch(API)
      .then(res => res.json())
      .then(data => setMessages(data));
  };

  useEffect(() => {
    loadMessages();
  }, []);

  // CREATE / UPDATE
  const submit = () => {
    if (form._id) {
      fetch(`${API}/${form._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      }).then(loadMessages);
    } else {
      fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      }).then(loadMessages);
    }

    setForm({ _id: null, name: "", message: "" });
  };

  // DELETE
  const remove = (id) => {
    fetch(`${API}/${id}`, { method: "DELETE" })
      .then(loadMessages);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        CRUD Messages (React + MUI)
      </Typography>

      {/* FORM */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <TextField
          label="Nom"
          fullWidth
          margin="normal"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <TextField
          label="Message"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
        />
        <Button variant="contained" onClick={submit}>
          {form._id ? "Modifier" : "Ajouter"}
        </Button>
      </Paper>

      {/* TABLE */}
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.map(m => (
            <TableRow key={m._id}>
              <TableCell>{m.name}</TableCell>
              <TableCell>{m.message}</TableCell>
              <TableCell>
                <IconButton onClick={() => setForm(m)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => remove(m._id)} color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
