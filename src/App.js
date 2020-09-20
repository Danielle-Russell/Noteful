import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import NoteListNav from "./NoteListNav";
import NotePageNav from "./NotePageNav";
import NoteListMain from "./NoteListMain";
import NotePageMain from "./NotePage";
import "./App.css";
import Store from "./Store.js";
import FormPage from "./FormPage";
import AddNotePage from "./AddNotePage";

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    this.setState(Store);
  }

  renderNavRoutes() {
    let findNote = (notes = [], noteId) =>
      notes.find((note) => note.id === noteId);

    let findFolder = (folders = [], folderId) =>
      folders.find((folder) => folder.id === folderId);

    const { notes, folders } = this.state;

    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route
            exact
            key={path}
            path={path}
            render={(routeProps) => (
              <NoteListNav folders={folders} notes={notes} {...routeProps} />
            )}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={(routeProps) => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NotePageNav {...routeProps} folder={folder} />;
          }}
        />
      </>
    );
  }

  renderMainRoutes() {
    let getNotesForFolder = (notes = [], folderId) =>
      !folderId ? notes : notes.filter((note) => note.folderId === folderId);
    let findNote = (notes = [], noteId) =>
      notes.find((note) => note.id === noteId);

    const { notes, folders } = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route
            exact
            key={path}
            path={path}
            render={(routeProps) => {
              const { folderId } = routeProps.match.params;
              const notesForFolder = getNotesForFolder(notes, folderId);
              return <NoteListMain {...routeProps} notes={notesForFolder} />;
            }}
          />
        ))}
        <Route path="/add-folder" component={FormPage} />
        <Route path="/add-note" component={AddNotePage} />
        <Route
          path="/note/:noteId"
          render={(routeProps) => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId);
            return <NotePageMain {...routeProps} note={note} />;
          }}
        />
      </>
    );
  }

  render() {
    return (
      <>
        <header>
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>
        <div id="container">
          <nav id="left">{this.renderNavRoutes()}</nav>
          <main id="right">{this.renderMainRoutes()}</main>
        </div>
      </>
    );
  }
}

export default App;
