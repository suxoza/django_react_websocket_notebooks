import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import './App.css'

// Notes
const NotesIndex = React.lazy(() => import('./pages/notes/index'));
const NotesList = React.lazy(() => import('./pages/notes/list'));
const EditNote = React.lazy(() => import('./pages/notes/edit'));
const CreateNote = React.lazy(() => import('./pages/notes/new'));
const ViewNote = React.lazy(() => import('./pages/notes/view'));

const WebSocketDemo = React.lazy(() => import('./pages/web_socket_test'))
const WebSocketDemo2 = React.lazy(() => import('./pages/web_socket_test2'))
const WebSocketDemo3 = React.lazy(() => import('./pages/web_socket_test3'))

function App() {

  return (
    <div className="App">
      <Router>
        <React.Suspense fallback={''}>
          <Routes>
            <Route path="/" element={<NotesIndex />}>
              <Route index element={<NotesList />} />
              <Route path='doc/create' element={<CreateNote />} />
              <Route path='doc/:note_id/edit' element={<EditNote />} />
              <Route path='doc/:note_id/view' element={<ViewNote />} />


              <Route path="/web_socket" element={<WebSocketDemo />} />
              <Route path="/web_socket2" element={<WebSocketDemo2 />} />
              <Route path="/web_socket3" element={<WebSocketDemo3 />} />
            </Route>
          </Routes>
        </React.Suspense>
      </Router>
    </div>
  )
}

export default App