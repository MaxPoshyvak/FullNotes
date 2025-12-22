const handleDeleteNote = (
    _id: string,
    e: React.MouseEvent,
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
    notes: Note[]
) => {
    e.stopPropagation();
    setNotes(notes.filter((note) => note._id !== _id));
};
