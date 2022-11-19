import { useMemo, useState } from "react";
import React from "react";
import NewItem from "./NewItem";

function useSearchBadges(Notes, SearchValue) {
  const [NotesFilted, setNotesFilted] = useState(Notes);
  useMemo(() => {
    const result = Notes.filter((Notes) => {
      return `${Notes.title} ${Notes.description}`
        .toLowerCase()
        .includes(SearchValue.toLowerCase());
    });
    setNotesFilted(result);
  }, [Notes, SearchValue]);
  return NotesFilted;
}

const NoteList = (props) => {
  const NotesList = useSearchBadges(props.Notes, props.SearchNote);
  if (NotesList.length === 0) {
    return (
      <div className='Not_found'>
        <div>No note found</div>
        <div className='Not_found--small'>Create a note....</div>
      </div>
    );
  }
  return (
    <ul className='Note-list'>
      {NotesList.map((note, i) => {
        let acunt = i++;
        return (
          <li key={acunt}>
            <NewItem
              Notes={props.Notes}
              Edit={props.Edit}
              Delete={props.Delete}
              id={acunt}
              _id={note._id}
              title={note.title}
              note={note.note[0]}
            />
          </li>
        );
      })}
    </ul>
  );
};
export default NoteList;
