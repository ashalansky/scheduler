import React, {useState} from "react";
import Button from "components/Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
const [name, setName] = useState(props.name || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);
const [error, setError] = useState("");


const reset = () => {
  setName("");
  setInterviewer(null);
}
const cancel = () => {
  reset();
  props.onCancel();
}
// const save = () => {
//   // if (interviewer) {
//     props.onSave(name, interviewer);
//   // }
// }
const validate = () => {
  if (name === "") {
    setError("Student name cannot be blank");
    return;
  }
  setError("");
  props.onSave(name, interviewer);
}

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" 
          onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={e => setName(e.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
        interviewers={props.interviewers} 
        value={interviewer} 
        onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
}