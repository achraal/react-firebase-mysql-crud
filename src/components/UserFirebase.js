import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from "@mui/material";

import { Add, Edit, Delete } from "@mui/icons-material";
import { db } from "../firebase"; // Vérifie que le chemin vers firebase.js est correct (ici un dossier parent) [cite: 54]
import { ref, push, onValue, update, remove } from "firebase/database"; // [cite: 55]

function UserFirebase() { // Nom changé pour éviter les conflits avec App.js
  const [users, setUsers] = useState({}); // [cite: 57]
  const [open, setOpen] = useState(false); // [cite: 58]
  const [editId, setEditId] = useState(null); // [cite: 59]

  const [form, setForm] = useState({
    nom: "",
    email: "",
    tel: "",
    date_naissance: ""
  }); // [cite: 60, 61, 62, 63, 64]

  // Charger les users en temps réel depuis Firebase [cite: 66]
  useEffect(() => {
    const usersRef = ref(db, "users/"); // [cite: 68]
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val(); // [cite: 70]
      setUsers(data || {}); // [cite: 71]
    });
  }, []);

  const handleOpen = (user = null, id = null) => {
    if (user) {
      setForm(user); // [cite: 76]
      setEditId(id); // [cite: 77]
    } else {
      setForm({
        nom: "",
        email: "",
        tel: "",
        date_naissance: ""
      }); // [cite: 79, 80, 81, 82, 83]
      setEditId(null); // [cite: 85]
    }
    setOpen(true); // [cite: 87]
  };

  const handleClose = () => {
    setOpen(false); // [cite: 90]
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // [cite: 93]
  };

  const handleSubmit = () => {
    if (editId) {
      update(ref(db, "users/" + editId), form); // Modification [cite: 97]
    } else {
      push(ref(db, "users/"), form); // Ajout [cite: 99]
    }
    handleClose(); // [cite: 101]
  };

  const handleDelete = (id) => {
    remove(ref(db, "users/" + id)); // Suppression [cite: 104]
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3 }}>
        Gestion des Utilisateurs (Firebase)
      </Typography>

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen()}
      >
        Ajouter
      </Button>

      <Table sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Téléphone</TableCell>
            <TableCell>Date Naissance</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users &&
            Object.entries(users).map(([id, user]) => (
              <TableRow key={id}>
                <TableCell>{user.nom}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.tel}</TableCell>
                <TableCell>{user.date_naissance}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(user, id)}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(id)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Modal de formulaire */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          {editId ? "Modifier Utilisateur" : "Ajouter Utilisateur"}
        </DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="Nom"
            name="nom"
            fullWidth
            value={form.nom}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Téléphone"
            name="tel"
            fullWidth
            value={form.tel}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            type="date"
            name="date_naissance"
            fullWidth
            value={form.date_naissance}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editId ? "Modifier" : "Ajouter"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default UserFirebase; // Exportation mise à jou