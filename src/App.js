import React, { useState, useCallback } from "react"

import "./App.css"

function AddListItem({ add }) {
    const [categoryName, setCategoryName] = useState("")
    return (
        <span onClick={() => add(categoryName)}>
            + Add category{" "}
            <input
                value={categoryName}
                onChange={e => setCategoryName(e.target.value)}
                type="text"
            />
        </span>
    )
}

function ListItem({ children }) {
    return <li>{children}</li>
}

function List({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    return <ul onClick={() => setIsOpen()}>{isOpen && children}</ul>
}

function App() {
    const [categories, setCategories] = useState([
        {
            id: 1,
            name: "root",
            children: [
                {
                    name: "window"
                }
            ]
        }
    ])
    const [recursive, setRecursive] = useState(true)

    const path = "1"

    const addCategories = useCallback(
        (path, children, i) => {
            const pathArr = path.split(".")
            const getArrCopy = array => [...array]
        },
        [categories]
    )

    const getCategoriesRecursive = useCallback(
        (categories, id) => (
            <List>
                <>
                    {categories.map(category =>
                        category.children ? (
                            <ListItem>
                                {getCategoriesRecursive(category.children)}
                            </ListItem>
                        ) : (
                            <ListItem>{category}</ListItem>
                        )
                    )}
                    <ListItem>
                        <AddListItem
                            add={categoryName =>
                                setCategories(updateCategories())
                            }
                        />
                    </ListItem>
                </>
            </List>
        ),
        []
    )

    return (
        <div className="App">
            <header>
                <nav>
                    <span className="nav-item">Recursive</span>
                    <span className="nav-item">Iterative</span>
                </nav>
            </header>
            <aside>{recursive && getCategoriesRecursive(categories, 1)}</aside>
        </div>
    )
}

export default App
