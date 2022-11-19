import React from "react";
import Layout from "./comp/Layout";
import NewNote from "./comp/NewNote";
import NoteList from "./comp/NoteList";

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        title: "",
        description: "",
      },
      notes: JSON.parse(localStorage.getItem("notes"))
        ? [...JSON.parse(localStorage.getItem("notes"))]
        : [],
      Search: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.form.description !== "" || this.state.form.title !== "") {
      this.setState({
        notes: [...this.state.notes, this.state.form],
      });
      this.setState({
        form: {
          title: "",
          description: "",
        },
      });
      setTimeout(() => {
        localStorage.setItem("notes", JSON.stringify(this.state.notes));
      }, 0);
    }
  };

  handleDeleteStorage = () => {
    if (window.confirm("Are you sure?")) {
      localStorage.removeItem("notes");
      this.setState({
        notes: [],
      });
    }
  };

  handlecolor = () => {
    const naam = document.getElementById("meraNaam");
    console.log(naam.value);
  };

  handleDelete = (i) => {
    if (window.confirm("Are you sure?")) {
      if (i !== -1) {
        const newNotesList = this.state.notes.slice();
        newNotesList.splice(i, 1);
        this.setState({
          notes: newNotesList,
        });
        setTimeout(() => {
          localStorage.setItem("notes", JSON.stringify(this.state.notes));
        }, 0);
      }
    }
  };
  Edit = (i, title, description) => {
    this.props.Edit(i, title, description);
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  handleChangeSearch = (e) => {
    this.setState({
      Search: e.target.value,
    });
  };
  handleDoubleClick = (e) => {
    e.stopPropagation();
    console.log(e.target.parentElement);
    // console.log(e);
  };

  render() {
    return (
      <Layout onChange={this.handleChangeSearch}>
        <>
          <NewNote
            onClick={this.handleDeleteStorage}
            onChange={this.handleChange}
            formValues={this.state.form}
            onSubmit={this.handleSubmit}
          />
          <NoteList
            DoubleClick={this.handleDoubleClick}
            Notes={this.state.notes}
            Edit={this.Edit}
            SearchNote={this.state.Search}
            Delete={this.handleDelete}
          />
        </>
      </Layout>
    );
  }
}

export default Note;
