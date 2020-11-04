import React from 'react';

import Button from 'components/Button';

export default function Confirm(props) {

  function cancelAction() {
    props.onCancel();
  }

  function confirmDelete() {
    props.onDelete();
  }

  return(
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={cancelAction}>Cancel</Button>
        <Button danger onClick={confirmDelete} alt="Confirm">Confirm</Button>
      </section>
    </main>
  );
}