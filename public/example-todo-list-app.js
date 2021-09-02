// const { Fragment, memo, useCallback, useState } = React;
// const { render } = ReactDOM;

// function App() {
//   const [items, setItems] = useState([
//     { id: 1, isComplete: true, text: 'Get groceries' },
//     { id: 2, isComplete: true, text: 'Feed the cat' },
//     { id: 3, isComplete: false, text: 'Do laundry' },
//   ]);

//   const removeItem = useCallback(
//     (itemToRemove) => setItems(items.filter((item) => item !== itemToRemove)),
//     [items],
//   );

//   const toggleItem = useCallback(
//     (itemToToggle) => {
//       // Dont use indexOf()
//       // because editing props in DevTools creates a new Object.
//       const index = items.findIndex((item) => item.id === itemToToggle.id);

//       setItems(
//         items
//           .slice(0, index)
//           .concat({
//             ...itemToToggle,
//             isComplete: !itemToToggle.isComplete,
//           })
//           .concat(items.slice(index + 1)),
//       );
//     },
//     [items],
//   );

//   return (
//     <Fragment>
//       <Header items={items} setItems={setItems} />
//       <List>
//         {items.map((item) => (
//           <MemoizedListItem
//             key={item.id}
//             item={item}
//             removeItem={removeItem}
//             toggleItem={toggleItem}
//           />
//         ))}
//       </List>
//     </Fragment>
//   );
// }

// function Header({ items, setItems }) {
//   const [newItemText, setNewItemText] = useState('');
//   const [uid, setUID] = useState(4);

//   const handleClick = useCallback(() => {
//     if (newItemText !== '') {
//       setItems([
//         ...items,
//         {
//           id: uid,
//           isComplete: false,
//           text: newItemText,
//         },
//       ]);
//       setUID(uid + 1);
//       setNewItemText('');
//     }
//   }, [newItemText, items, setItems, uid]);

//   const handleKeyPress = useCallback(
//     (event) => {
//       if (event.key === 'Enter') {
//         handleClick();
//       }
//     },
//     [handleClick],
//   );

//   const handleChange = useCallback(
//     (event) => {
//       setNewItemText(event.currentTarget.value);
//     },
//     [setNewItemText],
//   );

//   return (
//     <Row>
//       <input
//         type="text"
//         placeholder="New TODO item..."
//         value={newItemText}
//         onChange={handleChange}
//         onKeyPress={handleKeyPress}
//       />
//       <AddItem disabled={newItemText === ''} handleClick={handleClick} />
//     </Row>
//   );
// }

// function List({ children }) {
//   return <ul>{children}</ul>;
// }

// function Row({ children }) {
//   return (
//     <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
//   );
// }

// function AddItem({ disabled, handleClick }) {
//   return (
//     <button
//       disabled={disabled}
//       onClick={handleClick}
//       style={{
//         background: 'none',
//         border: 'none',
//         color: disabled ? '#CCC' : '#48F',
//         padding: 0,
//         cursor: disabled ? 'default' : 'pointer',
//       }}
//     >
//       <svg width="24" height="24" viewBox="0 0 24 24">
//         <path d="M0 0h24v24H0z" fill="none" />
//         <path
//           fill="currentColor"
//           d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
//         />
//       </svg>
//     </button>
//   );
// }

// function ListItem({ item, removeItem, toggleItem }) {
//   const handleDelete = useCallback(() => {
//     removeItem(item);
//   }, [item, removeItem]);

//   const handleToggle = useCallback(() => {
//     toggleItem(item);
//   }, [item, toggleItem]);

//   return (
//     <li style={{ display: 'flex', alignItems: 'center' }}>
//       <button
//         onClick={handleDelete}
//         style={{
//           background: 'none',
//           border: 'none',
//           color: '#F24',
//           padding: 0,
//           cursor: 'pointer',
//         }}
//       >
//         <svg width="24" height="24" viewBox="0 0 24 24">
//           <path d="M0 0h24v24H0z" fill="none" />
//           <path
//             fill="currentColor"
//             d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"
//           />
//         </svg>
//       </button>
//       <label>
//         <input
//           checked={item.isComplete}
//           onChange={handleToggle}
//           type="checkbox"
//         />{' '}
//         {item.text}
//       </label>
//     </li>
//   );
// }

// const MemoizedListItem = memo(ListItem);

// const root = document.getElementById('root');

// render(<App />, root);

window.mdebug.init();
