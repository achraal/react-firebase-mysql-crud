import { useState, useEffect } from "react";
import {
  Container, Typography, TextField, Button,
  Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, Paper
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const API_URL = "http://localhost/api-contact/contact.php"; // changer selon ton serveur

export default function ContactCRUD() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", tel: "", email: "" });

  // ─────────── READ ───────────
  const fetchContacts = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setContacts(data));
  };
  useEffect(() => {
    fetchContacts();
  }, []);

  // ─────────── CREATE / UPDATE ───────────
  const handleSubmit = () => {
    if (form.id) {
      // UPDATE
      fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      }).then(() => {
        fetchContacts();
        setForm({ id: null, name: "", tel: "", email: "" });
      });
    } else {
      // CREATE
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
      .then(res => res.json())
      .then(() => {
        fetchContacts();
        setForm({ id: null, name: "", tel: "", email: "" });
      });
    }
  };

  // ─────────── DELETE ───────────
  const handleDelete = (id) => {
    fetch(API_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `id=${id}`
    }).then(() => fetchContacts());
  };

  // ─────────── EDIT ───────────
  const handleEdit = (contact) => {
    setForm(contact);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Gestion Contact</Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <TextField
          label="Nom" fullWidth margin="normal"
          value={form.name} onChange={e => setForm({...form, name:e.target.value})}
        />
        <TextField
          label="Téléphone" fullWidth margin="normal"
          value={form.tel} onChange={e => setForm({...form, tel:e.target.value})}
        />
        <TextField
          label="Email" fullWidth margin="normal"
          value={form.email} onChange={e => setForm({...form, email:e.target.value})}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          {form.id ? "Modifier" : "Ajouter"}
        </Button>
      </Paper>

      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Téléphone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map(c => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.tel}</TableCell>
              <TableCell>{c.email}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleEdit(c)}><Edit /></IconButton>
                <IconButton color="error" onClick={() => handleDelete(c.id)}><Delete /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
