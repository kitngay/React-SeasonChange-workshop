import React from "react";
import logo from "./logo.svg";
import "./App.css";
import moment from "moment";
import Input from "./input.js";
import axios from "axios"
const subjects = ["Math", "React", "Computer"];
const targetDate = moment("12/21/2019 17:00:00");

function App() {
  const [name, setName] = React.useState("");
  const [email, setemail] = React.useState("");
  const [subject, setsubject] = React.useState("");
  const [IsChecked, setIsChecked] = React.useState(false);
  const [time, settime] = React.useState("");
  const [message, setmessage] = React.useState("");
  const[isLoading, setloading] = React.useState(false);

  const handleSubmit = () => {
    setloading(true);
    axios.get("http://www.mocky.io/v2/5dfde561310000ed1ac96e39?mocky-delay=4000ms&fbclid=IwAR3flZCSwy-eS__KIceQjIDYO12vNqjh3NlGTFZfZsde6_gs0C2jp04k_20")
    .then(response => {
      const { data } = response;
      setmessage(data.response);
    setloading(false);
    })
  };

  const updateTimer = () => {
    const diffHour = targetDate.diff(moment(), "hour");
    const diffminute = targetDate.diff(moment(), "minute") % 60;
    const diffsecond = targetDate.diff(moment(), "second") % 60;
    console.log(diffHour, diffminute, diffsecond);

    settime(`${diffHour} hour ${diffminute} minutes ${diffsecond} seconds`);
  };

  React.useEffect(() => {
    const interval = setInterval(updateTimer, 1000);
    axios.get("http://www.mocky.io/v2/5dfde8a6310000551ec96e5b")
    .then(response => {
      setsubject(response.data.subject)
    })
    return () => clearInterval(interval);
  }, []);

  console.log("state: ", { name, email, subject, IsChecked });

  return (
    <div className="App">
      <div className="title">Season Change Registation</div>
      <p>From end in</p>
      <p>{time}</p>

      <Input
        label="name"
        value={name}
        onChangeFromComponent={value => setName(value)}
      />
      <Input
        label="Email"
        value={email}
        onChangeFromComponent={value => setemail(value)}
      />

      <div className="field">
        <label className="label">Subject</label>
        <div className="control">
          <div className="select">
            <select
              value={subject}
              onChange={event => setsubject(event.target.value)}
            >
              {subjects.map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input
              type="checkbox"
              value={IsChecked}
              onChange={event => setIsChecked(event.target.checked)}
            />
            I agree to the <a href="#">terms and conditions</a>
          </label>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className={`button is-link ${isLoading && 'is-loading'}`} onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light">Cancel</button>
        </div>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default App;
