import Item from "./Item";

function List(){
    return (
        <>
        <h1>Minha Lista</h1>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <Item item="Item 3"/>
            <Item item="Item 4"/>
        </ul>
        </>
    )
}

export default List;