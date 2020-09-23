import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import NoteListNav from "./NoteListNav";
import NotePageNav from "./NotePageNav";
import NoteListMain from "./NoteListMain";
import NotePageMain from "./NotePage";
import "./App.css";
import AddNotePage from "./AddNotePage";
import NotefulContext from "./Context";
import config from "./config";
import AddFolder from './AddFolder'
import ErrorBoundaries from './ErrorBoundaries'

class App extends Component {
  state = {
    notes: [],
    folders: [],
    newFolder: {
      hasError: false,
      touched: false,
      name: '',
    },
    newNote: {
      name: {
        touched: false,
        value: '',
      },
      content: {
        touched: false,
        value:'',
      },
      folder_id: {
        touched: false,
        value: '',
      }
    }
  }

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

  updateNewFolderName = (name) => {
    this.setState({
      newFolder: {
        hasError: false,
        touched: true,
        name: name,
      }
    })
  }

  updateNewNoteData = (input, value) => {
    this.setState({
      newNote: {
        ...this.state.newNote,
        [input]: {
          touched: true,
          value: value,
        },
      },
    })
  }

  
addFolder = newFolder => {
  this.setState({
    folders: [...this.state.folders, newFolder]
  })
}

addNote = note => {
  this.setState({
    notes: [...this.state.notes, note],
  })
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
        <Route path="/add-folder" component={AddFolder} />
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
      addFolder: this.addFolder,
      newFolder: this.state.newFolder,
      updateNewFolderName: this.updateNewFolderName,
      newNote: this.state.newNote,
      handleAddNote: this.addNote,
      updateNewNoteData: this.updateNewNoteData
    };
    return (
      <NotefulContext.Provider value={contextValue}>
        <ErrorBoundaries>
        <header>
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>
        <div id="container">
          <nav id="left">{this.renderNavRoutes()}</nav>
          <main id="right">{this.renderMainRoutes()}</main>
        </div>
        </ErrorBoundaries>
      </NotefulContext.Provider>
    );
  }
}

export default App;
