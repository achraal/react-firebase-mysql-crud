import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Container } from "@mui/material";

// Import de tes composants existants
import UserFirebase from "./components/UserFirebase";
import ContactMySQL from "./components/ContactMySQL";

// AJOUT DE L'IMPORT MANQUANT ICI
import MessageCRUD from "./components/MessageCRUD"; 

function App() {
  return (
    <Router>
      {/* Barre de Navigation */}
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Mon Portefeuille CRUD
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Firebase (Users)
          </Button>
          <Button color="inherit" component={Link} to="/mysql">
            MySQL (Contacts)
          </Button>
          <Button color="inherit" component={Link} to="/message">
            MongoDB (Messages)
          </Button>
        </Toolbar>
      </AppBar>

      {/* Contenu des pages */}
      <Container>
        <Routes>
          <Route path="/" element={<UserFirebase />} />
          <Route path="/mysql" element={<ContactMySQL />} />
          {/* Cette route utilise maintenant le composant importé */}
          <Route path="/message" element={<MessageCRUD />} /> 
        </Routes>
      </Container>
    </Router>
  );
}

export default App;