export interface Note {
  id: number,
  noteText: string
}

export interface NoteResponse {
  content: Note[],
  totalPages: number,
  size: number,
  number: number
}