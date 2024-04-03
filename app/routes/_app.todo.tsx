import { useEffect, useState } from 'react';

export default function Index() {
    return (
        <div>
            <h1 className="font-bold text-xl">Todo Lists</h1>

            <Lists />
        </div>
    );
}

/**
 * This is a React 17 & TypeScript 4.4.2 project using react-scripts 4.0.3.
 *
 * Let's work through the exercises below using just these dependencies.
 *
 * Styles are defined in `styles.css` and the class names used in that file
 * can be referenced exactly as named in JSX `className` attributes.
 * e.g. `.App { ... }` can be referenced as `className="App"`
 *
 * Exercise Part 1:
 * Make a todo list where...
 * - there is a list of todos with checkboxes that indicate whether the todo item is complete
 * - there is a text input of some kind to write the content for new items
 * - there is a button to click that adds the new drafted item
 * - the UX is decomposed into at least two supporting components
 * - TypeScript types are declared for all props and state
 *
 * Exercise Part 2:
 * Add any or all of the following features/changes...
 * - there is a button to click that clears/removes todo items that are complete
 * - refactor the whole component to support being used as a shared component, including multiple
 * lists on a single page
 * - apply aesthetic styles such as strikethrough styled text for completed todos
 * - todo items, inputs, and buttons have appropriate accessibility attributes
 * - add basic validation to any text inputs
 * - define a custom hook for all state tracked
 * - add a concept of nested or hierarchical todo items, at least one level deep
 * - store todo state in browser storage so that it persists across refreshes
 * - write mock functions to persist and retrieve todo state from an API
 */

function Lists() {
    return (
        <div className="App">
            <List name="Todo" />
            <List name="Chores" />
        </div>
    );
}

interface ItemModel {
    id: string;
    text: string;
    complete: boolean;
}

export function List({ name }: { name: string }) {
    const [items, setItems] = useState<ItemModel[]>(
        JSON.parse(localStorage.getItem(name) ?? '[]') as ItemModel[],
    );

    useEffect(() => {
        localStorage.setItem(name, JSON.stringify(items));
    }, [items, name]);

    const handleAdd = (text: string) => {
        setItems([...items, { id: getId(5), text, complete: false }]);
    };

    const handleItemUpdate = (id: string, complete: boolean) => {
        const index = items.findIndex((item) => id === item.id);
        items[index].complete = complete;
        setItems([...items]);
    };

    const handleClear = () => {
        setItems(items.filter(({ complete }) => !complete));
    };

    return (
        <div className="flex flex-col space-y-2">
            <h2 className="text-xl">{name}</h2>

            {items.map((item) => (
                <Item key={item.id} {...item} onUpdate={handleItemUpdate} />
            ))}

            <AddItem onAdd={handleAdd} />

            <div>
                <button
                    type="button"
                    onClick={handleClear}
                    className="border-1 border-red-600 p-2 rounded text-red-600"
                >
                    Clear completed items
                </button>
            </div>
        </div>
    );
}

interface ItemProps extends ItemModel {
    onUpdate: (id: string, complete: boolean) => void;
}

export function Item({ id, text, complete, onUpdate }: ItemProps) {
    const styles: React.CSSProperties = {};
    if (complete) {
        styles.textDecoration = 'line-through';
        styles.opacity = 0.8;
    }
    return (
        // This is already achieved by wrapping the checkbox with a label.
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label style={styles} className="items-center p-2 hover:bg-slate-200 cursor-pointer">
            <input
                type="checkbox"
                checked={complete}
                onChange={(e) => onUpdate(id, e.target.checked)}
            />
            <span className="ml-2">{text}</span>
        </label>
    );
}

interface AddItemProps {
    onAdd: (text: string) => void;
}

export function AddItem({ onAdd }: AddItemProps) {
    const [text, setText] = useState('');

    const handleAdd = () => {
        if (text && text.length <= 100) {
            onAdd(text);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={text}
                placeholder="What do you want to do?"
                aria-label="What do you want to do?"
                onChange={(e) => setText(e.target.value)}
                required
                maxLength={100}
                className="border-1 border-gray-600 p-2 rounded"
            />
            <button
                type="button"
                onClick={handleAdd}
                className="border-1 border-blue-600 p-2 rounded text-blue-600 ml-2"
            >
                Add Item
            </button>
        </div>
    );
}

function getId(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
