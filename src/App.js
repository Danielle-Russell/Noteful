import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import NoteListNav from "./NoteListNav";
import NotePageNav from "./NotePageNav";
import NoteListMain from "./NoteListMain";
import NotePageMain from "./NotePage";
import "./App.css";
import FormPage from "./FormPage";
import AddNotePage from "./AddNotePage";
import NotefulContext from "./Context";
import config from "./config";

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`),
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then((e) => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then((e) => Promise.reject(e));
        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  deleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteId),
    });
  };

  renderNavRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />;
      </>
    );
  }

  renderMainRoutes() {
    

    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path="/add-folder" component={FormPage} />
        <Route path="/add-note" component={AddNotePage} />
        <Route path="/note/:noteId" component={NotePageMain} />
      </>
    );
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
    };
    return (
      <NotefulContext.Provider value={contextValue}>
        <header>
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>
        <div id="container">
          <nav id="left">{this.renderNavRoutes()}</nav>
          <main id="right">{this.renderMainRoutes()}</main>
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;
