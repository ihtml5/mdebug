const { Fragment, Suspense, useState } = React;
const { render } = ReactDOM;

const COUNTS = {
  Inbox: 131,
  Snoozed: 0,
  Spam: 2123,
  Social: 728,
};

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <EmailClient name="Brian" />
    </Suspense>
  );
}

function EmailClient({ name }) {
  const [tab, setTab] = useState('Inbox');
  return (
    <Fragment>
      <h1 style={{ margin: '0 0 0.5rem' }}>{name}'s Email</h1>
      <div style={{ paddingRight: '0.5rem' }}>
        <Suspense fallback={<LoadingLabel />}>
          <Label name="Inbox" isSelected={tab === 'Inbox'} />
        </Suspense>
        <Suspense fallback={<LoadingLabel />}>
          <Label name="Spam" isSelected={tab === 'Spam'} />
        </Suspense>
        <Suspense fallback={<LoadingLabel />}>
          <Label name="Social" isSelected={tab === 'Social'} />
        </Suspense>
      </div>
    </Fragment>
  );
}

function Loading() {
  return <em style={{ color: 'gray', fontWeight: 'bold' }}>Loading...</em>;
}

function LoadingLabel() {
  return (
    <div
      style={{
        padding: '0.5rem',
        width: '8rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <em style={{ color: 'gray', fontWeight: 'bold' }}>Loading...</em>
    </div>
  );
}

function Label({ isSelected, name }) {
  const count = COUNTS[name];
  return (
    <div
      style={{
        backgroundColor: isSelected ? '#eee' : 'transparent',
        padding: '0.5rem',
        borderTopRightRadius: '1rem',
        borderBottomRightRadius: '1rem',
        width: '8rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <strong>{name}</strong> {count > 0 && <span>({count})</span>}
    </div>
  );
}

const root = document.getElementById('root');

render(<App />, root);
