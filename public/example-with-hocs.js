const { useEffect, useState } = React;
const { render } = ReactDOM;

function App() {
  return (
    <div>
      <ConnectedShowTheTime />
    </div>
  );
}

function withCurrentDate(Component) {
  function WithCurrentDate(props) {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
      const intervalID = setInterval(() => {
        setDate(new Date());
      }, 1000);
      return () => clearInterval(intervalID);
    }, []);
    return <Component date={date} />;
  }
  WithCurrentDate.displayName = `withCurrentDate(${Component.displayName ||
    Component.name})`;
  return WithCurrentDate;
}

function ShowTheTime({ date }) {
  return <div>The current time is {date.toLocaleTimeString()}</div>;
}

const ConnectedShowTheTime = withCurrentDate(ShowTheTime);

const root = document.getElementById('root');

render(<App />, root);
