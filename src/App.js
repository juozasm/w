import React, { useState } from "react"

import "./App.scss"

export function AddListItem({ addCategory }) {
    const [categoryName, setCategoryName] = useState("")
    return (
        <div className="actions-wrapper">
            <button
                className="btn"
                data-testid="addCategory"
                onClick={() => addCategory(categoryName)}
            >
                + Add category{" "}
            </button>
            <input
                data-testid="categoryInput"
                value={categoryName}
                onChange={e => setCategoryName(e.target.value)}
                type="text"
            />
        </div>
    )
}

export function ListItem({ children }) {
    return <li>{children}</li>
}

export function RecursiveList({ categories, addCategory, depth }) {
    return (
        <ul>
            {categories.map((category, i) => (
                <React.Fragment key={`${category.id}-${i}`}>
                    <ListItem>{category.name}</ListItem>
                    <ListItem>
                        <RecursiveList
                            categories={category.children}
                            depth={depth + 1}
                            addCategory={c =>
                                addCategory(
                                    Object.assign([], categories, {
                                        [i]: {
                                            ...categories[i],
                                            children: c
                                        }
                                    })
                                )
                            }
                        />
                    </ListItem>
                </React.Fragment>
            ))}
            <ListItem>
                <AddListItem
                    addCategory={name =>
                        addCategory([
                            ...categories,
                            {
                                id: `${depth}-${categories.length}`,
                                name,
                                children: []
                            }
                        ])
                    }
                />
            </ListItem>
        </ul>
    )
}

export function IterativeList({ categories }) {
    return <ul>{getIterativeList(categories)}</ul>
}

export function getIterativeList(categories) {
    const parentElement = {
        depth: 0,
        next: null,
        children: categories
    }

    const renderList = []

    let children, i, len
    let current, last
    current = parentElement
    last = current

    while (current) {
        children = current.children

        for (i = 0, len = children.length; i < len; i++) {
            let child = children[i]
            child.depth = current.depth + 1
            renderList.push(
                <li
                    style={{ marginLeft: (child.depth - 1) * 30 }}
                    key={`${child.depth}-${i}`}
                >
                    {children[i].name}
                </li>
            )
            child.next = null
            last.next = child
            last = child
        }
        current = current.next
    }
    return renderList
}

function App() {
    const [categories, setCategories] = useState([
        {
            name: "cat",
            id: "1",
            children: []
        },
        {
            name: "dog",
            id: "1",
            children: []
        },
        {
            name: "test3",
            id: "3",
            children: [
                {
                    name: "test3.1",
                    id: "3.1",
                    children: []
                },
                {
                    name: "test3.2",
                    id: "3.2",
                    children: [
                        {
                            name: "test3.2.1",
                            id: "3.2.1",
                            children: []
                        }
                    ]
                }
            ]
        }
    ])
    const [recursive, setRecursive] = useState(true)

    return (
        <div className="App">
            <header>
                <nav>
                    <span
                        onClick={() => setRecursive(true)}
                        className="nav-item"
                    >
                        Recursive
                    </span>
                    <span
                        onClick={() => setRecursive(false)}
                        className="nav-item"
                    >
                        Iterative
                    </span>
                </nav>
            </header>
            <div className="container">
                <aside>
                    {recursive ? (
                        <RecursiveList
                            categories={categories}
                            addCategory={setCategories}
                            depth={0}
                        />
                    ) : (
                        <IterativeList categories={categories} />
                    )}
                </aside>
                <article>
                    <h1>CATEGORIES</h1>
                </article>
            </div>
        </div>
    )
}

export default App
