import React, { Fragment } from 'react';

import './styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from "../../hooks/useVisualMode";
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING ="DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
  }

  function saveEdit(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    destroy(props.id);
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_DELETE, true));
  }

  function destroy(event) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true))
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function confirmDelete() {
    transition(CONFIRM);
  }

  function editInterview() {
    transition(EDIT);
  }

  return(
    <article
    className="appointment"
    data-testid="appointment"
    >
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onConfirm={confirmDelete}
          onDelete={destroy}
          onEdit={editInterview}
        />
      )}
      {mode === CREATE && (
        <Form
          name={""}
          interviewer={null}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVING && (
        <Status
        message={'Saving'}
        />
      )}
      {mode === DELETING && (
        <Status
          message={'Deleting'}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
        message={'Are you sure you would like to delete?'}
        onCancel={back}
        onDelete={destroy}
        />
      )}
      {mode === EDIT && (
        <Form
        id={props.id}
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={saveEdit}
        onCancel={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Could not cancel appointment"}
          onBack={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={"Could not save appointment"}
          onBack={back}
        />
      )}

    </article>
  );
}