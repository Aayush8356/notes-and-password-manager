import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, PanelGroup, Panel, Modal, InputGroup, Icon } from "rsuite";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getNotes, deleteNote, updateNote } from "../../actions/notes";
import Spinner from "../layout/Spinner";
import Markdown from "react-markdown";
import AddNote from "./AddNote";
import NoteList from "./comp/NoteList";
import Layout from "./comp/Layout";

const Notes = ({
  getNotes,
  deleteNote,
  updateNote,
  auth: { isAuthenticated },
  notes: { loading, notes },
}) => {
  useEffect(() => {
    getNotes();
  }, [getNotes]);

  const [isEdit, changeEdit] = useState(false);
  const [note_id, changeNoteID] = useState("");
  const [search, setSearch] = useState("");
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const windowsize = () => {
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      return "xs";
    } else {
      return "lg";
    }
  };

  const [formData, setFormData] = useState({});
  const { title, note } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    changeEdit(!isEdit);
    e.preventDefault();
    setFormData({ ...formData, [title]: "", [note]: "" });
  };

  // collect edit note details
  const editNote = (n_id, tit, data) => {
    updateNote(n_id, tit, data);
  };

  const buttomStyles = {
    position: "fixed",
    bottom: "0px",
    width: "100%",
    height: "9%",
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Layout onChange={handleChangeSearch}>
          <AddNote />
          <NoteList
            DoubleClick={() => {}}
            Notes={notes}
            Edit={editNote}
            SearchNote={search}
            Delete={(id) => deleteNote(id)}
          />
        </Layout>
      )}
    </Fragment>
  );
};

Notes.propTypes = {
  getNotes: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  notes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  notes: state.notes,
  auth: state.auth,
});

export default connect(mapStateToProps, { getNotes, deleteNote, updateNote })(
  Notes
);
