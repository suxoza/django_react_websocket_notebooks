

import { NoteInterface } from "interfaces/notesInterface";
import axiosInstance from "config/axiosConfig"

export default class NoteService {

    public async getNotesList() : Promise<NoteInterface[]> {
        return await axiosInstance.get('/')
    } 

    public async getNote(note_id: number): Promise<NoteInterface> {
        return await axiosInstance.get(`/${note_id}`)
    }

    public async createNewNote(note: NoteInterface): Promise<NoteInterface> {
        return await axiosInstance.post('/', note)
    }

    public async deleteNote(note_id: number): Promise<{status: boolean}>{
        return await axiosInstance.delete(`/${note_id}`)
    }

    public async editNote(note_id: number, note: NoteInterface): Promise<NoteInterface>{
        return await axiosInstance.put(`/${note_id}/edit`, note)
    }
}



