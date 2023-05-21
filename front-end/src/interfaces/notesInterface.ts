

export interface noteCardComponentInterface {
    name: string,
    text: string,
    context: string,
    date: string

}

export interface NoteInterface {
    id?: number,
    created_by?: string, 
    current_owner?: string,
    file_name?: string,
    text: string,
    content: string,
    created_at?: string,
    updated_at?: string,
    is_deleted?: boolean,
}
