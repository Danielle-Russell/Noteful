import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import NoteListNav from "./NoteListNav";
import NotePageNav from "./NotePageNav";
import NoteListMain from "./NoteListMain";
import NotePage from "./NotePage";
import "./App.css";
import AddNotePage from "./AddNotePage";
import NotefulContext from "./Context";
import config from "./config";
import AddFolder from "./AddFolder";
import ErrorBoundaries from "./ErrorBoundaries";


//Trigger error boundary
const ErrorThrower = ({hasError}) => {
  if (hasError) {
    throw new Error(); 
  } return null
  }

class App extends Component {
  state = {
    notes: [],
    folders: [],
    newFolder: {
      touched: false,
      folder_name: "",
    },
    newNote: {
      note_name: {
        touched: false,
        value: "",
      },
      content: {
        touched: false,
        value: "",
      },
      folder_id: {
        touched: false,
        value: "",
      },
    },
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/notes`),
      fetch(`${config.API_ENDPOINT}/api/folders`),
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
      .catch((e) => {
        this.setState({
          hasError: true
        })
      });
  }

  

  updateNewFolderName = (name) => {
    this.setState({
      newFolder: {
        touched: true,
        folder_name: name,
      },
    });
  };

  updateNewNoteData = (input, value) => {
    this.setState({
      newNote: {
        ...this.state.newNote,
        [input]: {
          touched: true,
          value: value,
        },
      },
    });
  };

  addFolder = (newFolder) => {
    this.setState({
      folders: [...this.state.folders, newFolder],
    });
  };

  addNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note],
    });
  };

  deleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteId),
    });
  };

  renderNavRoutes() {
    
    return (
      <>
        {["/", "/folder/:folder_id"].map((path) => (
          
          <Route exact key={path} path={path} component={NoteListNav} />

         )
        )}
          
        <Route exact path="/note/:noteId" component={NotePageNav} />
        <Route exact path="/add-folder" component={NotePageNav} />
        <Route exact path="/add-note" component={NotePageNav} />;
      </>
    );
  }

  
    

  renderMainRoutes() {
   
   
    return (
    
      <>
        {["/", "/folder/:folder_id"].map((path) => (
          
          
          <Route exact key={path} path={path} component={NoteListMain} />
          
        ))}
        <Route exact path="/add-folder" component={AddFolder} />

        <Route exact path="/add-note" component={AddNotePage} />

        <Route exact path="/note/:noteId" component={NotePage} />
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
      updateNewNoteData: this.updateNewNoteData,
    };

  
    return (
      <>
        <header>
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>
        <ErrorBoundaries>

        <ErrorThrower hasError={this.state.hasError} />

        <NotefulContext.Provider value={contextValue}>

          <div id="container">
           
              <nav id="left">{this.renderNavRoutes()}</nav>

              <main id="right">{this.renderMainRoutes()}</main>
          
          </div>

          </NotefulContext.Provider>

          </ErrorBoundaries>
        
      </>
    );
}
}

export default App;
