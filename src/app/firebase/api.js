import { collection, getDocs, query, doc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from './firebase';


export const pushData = (data) => {
    addDoc(collection(db, 'orders'), data)
}

export const getData = async () => {
    // Consulto los datos de Firebase
    const data = await getDocs(query(collection(db, 'orders')));
    return data
}

export const pushDataServed = (data) => {
    addDoc(collection(db, 'served'), data)
}

export const deleteOrders = async (key) => {
    const data = doc(db, 'orders', key);
    await deleteDoc(data);
}

export const getDataServed = async () => {
    // Consulto los datos de Firebase
    const data = await getDocs(query(collection(db, 'served')));
    return data
}

export const pushDataPayed = (data) => {
    addDoc(collection(db, "payed"), data)
}

export const deleteServed = async (key) => {
    const data = doc(db, 'served', key);
    await deleteDoc(data);
}