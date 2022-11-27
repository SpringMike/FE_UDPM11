import axios from "axios";
import { saveAs } from 'file-saver';

export const createPDF = async (name: string, price1: number, price2: number, receiptId: string) => {
    try {
        axios.post(`http://localhost:5000/create-pdf`, { name, price1, price2, receiptId })
        .then(() => axios.get('http://localhost:5000/fetch-pdf', { responseType: 'blob' }))
        .then((res) => {
                console.log('innnnn123'); 
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(pdfBlob, 'newPdf.pdf');
            })
    } catch (error) {
        console.log(error);
    }

}


