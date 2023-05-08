import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [table, setTable] = useState(null);
    const [client, setClient] = useState(null);
    const [drinks, setDrinks] = useState([]);
    const [order, setOrder] = useState([]);
    const [finalOrder, setFinalOrder] = useState();

    let orderList = []

    //Creo un precio fijo para todas las bebidas ya que la API no tiene precios
    //Deberia crear un JSON asignando un precio a cada bebida, pero hay un total de 635 cocteles.
    //En un caso real los precios deberían generarse uno a uno
    let price = 8;

    const makeOrder = (id, name, price) => {
        //Añado bebida al listado drinks
        const newDrink = { qty: 1, id: id, name: name, price: price, totalPrice: price }

        setDrinks([
            ...drinks, newDrink
        ])

        //Almaceno las bebidas en LocalStorage para que no perderlas al cambiar de ventana
        if (localStorage.drinks === undefined) {
            localStorage.setItem("drinks", JSON.stringify([...orderList, newDrink]))
        } else {
            let drinksLocal = localStorage.getItem("drinks")
            let drinksOrder = JSON.parse(drinksLocal)
            localStorage.setItem("drinks", JSON.stringify([...drinksOrder, newDrink]))
        }
    }

    const verifyQty = () => {
        //Recupero las bebidas del LocalStorage
        let localDrinks = localStorage.getItem("drinks")

        if (localDrinks !== null) {
            let orderDrinks = JSON.parse(localDrinks)

            //Hago una copia bebidas pedidas
            // Y verifico si hay bebidas repetidas
            let notDuplicated = orderDrinks;

            //Itero sobre la copia
            notDuplicated.forEach((element, index) => {
                const copyItem = JSON.stringify(element);
                notDuplicated.forEach((item, nextIndex) => {
                    const itemCopy = JSON.stringify(item);
                    //el elemento se va a encontrar asi mismo, por eso establezco index!=indice. Index es la primera coincidencia y nextIndex son los arrays repetidos
                    if (copyItem === itemCopy && index !== nextIndex) {
                        //Splice me elimina los elementos duplicados
                        notDuplicated.splice(nextIndex, 1);
                        // Y modifico la cantidad
                        notDuplicated[index].qty++;
                        notDuplicated[index].totalPrice = notDuplicated[index].price * notDuplicated[index].qty;
                        setOrder(notDuplicated)
                    } else {
                        setOrder(notDuplicated)
                    }
                });
            });
        }
    }

    const confirmOrder = (data) => {
        setFinalOrder(data)
    }

    return (
        <DataContext.Provider value={{
            table, setTable, client, setClient, drinks, order, makeOrder, setOrder, verifyQty, confirmOrder, finalOrder, setFinalOrder, price
        }}>
            {children}
        </DataContext.Provider>
    )
}