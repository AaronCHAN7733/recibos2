// script.js

let totalAmount = 0;

function addProduct() {
    const productName = document.getElementById('product-name').value;
    const productQuantity = document.getElementById('product-quantity').value;
    const productPrice = document.getElementById('product-price').value;

    if (productName && productQuantity && productPrice) {
        const table = document.getElementById('invoice-table').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);

        const total = (productQuantity * productPrice).toFixed(2);

        cell1.textContent = productName;
        cell2.textContent = productQuantity;
        cell3.textContent = productPrice;
        cell4.textContent = total;

        totalAmount += parseFloat(total);
        updateTotal();

        // Clear input fields
        document.getElementById('product-name').value = '';
        document.getElementById('product-quantity').value = '';
        document.getElementById('product-price').value = '';
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

function updateTotal() {
    const totalElement = document.getElementById('total');
    totalElement.textContent = `Total: $${totalAmount.toFixed(2)}`;
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text('Factura', 20, 20);

    const table = document.getElementById('invoice-table');
    let rows = [];
    for (let i = 1, row; row = table.rows[i]; i++) {
        let rowData = [];
        for (let j = 0, col; col = row.cells[j]; j++) {
            rowData.push(col.innerText);
        }
        rows.push(rowData);
    }

    doc.autoTable({
        head: [['Producto', 'Cantidad', 'Precio', 'Subtotal']],
        body: rows,
        startY: 30
    });

    doc.text(`Total: $${totalAmount.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);

    doc.save('factura.pdf');
}


